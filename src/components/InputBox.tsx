import React, { useState, forwardRef, useImperativeHandle, Ref, useEffect, useRef } from 'react'
// import { test, testPost } from '../apis/test';
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
      console.log("uploaded", formData)
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
      <button className="btn join-item" onClick={() => onSend()}>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 h-5 stroke-current"
      viewBox="0 0 384 512">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
      </button>
    </div>
    </div>
  )
}

export default forwardRef(InputBox);