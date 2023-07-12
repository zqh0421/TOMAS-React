import React, { useState, forwardRef, useImperativeHandle, Ref, useEffect, useRef } from 'react'
import { test, testPost } from '../apis/test';
import { StartRecord, StopRecord, Loading } from './recordStatus';

export interface InputBoxRef {
  getInputValue: () => string | undefined;
  clearInput: () => void;
}

const InputBox = (props: { onSend: Function }, ref: Ref<unknown> | undefined) => {
  const [inputValue, setInputValue] = useState('')
  const [recordStatus, setRecordStatus] = useState(0) // 0-start, 1-stop, 2-loading
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  useImperativeHandle(ref, () => ({
    getInputValue: () => inputValue,
    clearInput: () => setInputValue('')
  }));

  const onInputBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSend = async () => {
    props.onSend()
    // try {
    //   await testPost.send();
    // } catch (error) {
    //   console.log(`Error: {error}`);
    // }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "Enter": onSend(); break;
      default: break;
    }
  }

  useEffect(() => {
    if (recordStatus===2) {
      setTimeout(() => {
        setInputValue(inputValue+"add some new message from speech-to-text api...")
        setRecordStatus(0);
      }, 3000)
    }
  }, [recordStatus])

  const transcriptRecord = (formData: FormData) => {
    try {
      // TODO: upload and receive
      console.log("uploaded")
    } catch (err) {
      console.error(err);
    }
  }
  
  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);
      
      newMediaRecorder.start();
      setRecordStatus(1);

      newMediaRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
      };
      
      newMediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { 'type' : 'audio/webm; codecs=opus' });
          const formData = new FormData();
          formData.append('file', audioBlob, 'audio_recording.webm')
          transcriptRecord(formData);
          audioChunks.current = [];
      };
    });
  }

  const handleStopRecording = () => {
    if (mediaRecorder) {
        mediaRecorder.stop();
        setRecordStatus(2);
    }
  };

  const handleRecord = () => {
    switch (recordStatus) {
      case 0: // start
        handleStartRecording();
        break;
      case 1:
        handleStopRecording();
        break;
      case 2:
        break;
      default: break;
    }
  }

  return (
    <div>
      <div className="join w-full">
      <div className="w-full">
        <div className="w-full">
          <input
            className="input join-item w-full"
            placeholder="Chat with TOMAS..."
            value={inputValue}
            onChange={(e) => onInputBoxChange(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        </div>
      </div>
      <button className="btn btn-ghost join-item" onClick={()=>{handleRecord()}} disabled={recordStatus===2 ? true : false}>
       {recordStatus===0 ? <StartRecord/> : recordStatus===1 ? <StopRecord/> : <Loading/>}
      </button>
      <button className="btn join-item" onClick={() => onSend()}>Send</button>
    </div>
    </div>
  )
}

export default forwardRef(InputBox);