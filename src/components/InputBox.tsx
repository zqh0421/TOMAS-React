import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  useRef,
} from "react";
import { Input } from "antd";
import { StartRecord, StopRecord, Loading } from "./recordStatus";
import { transcribe } from "../apis/transcribe";

export interface InputBoxRef {
  getInputValue: () => string | undefined;
  clearInput: () => void;
}

interface MyWindow extends Window {
  transcriptionNotSupportedModal: {
    showModal: () => void;
  };
}

interface InputBoxProps {
  onSend: Function
  disabled: boolean
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const { TextArea } = Input;

const InputBox = (
  props: InputBoxProps,
  ref: Ref<unknown> | undefined
) => {
  const [recordStatus, setRecordStatus] = useState(0); // 0-start, 1-stop, 2-loading
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const audioChunks = useRef<Blob[]>([]);
  useImperativeHandle(ref, () => ({
    getInputValue: () => props.inputValue,
    clearInput: () => props.setInputValue(""),
  }));

  const onInputBoxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setInputValue(e.target.value);
  };

  const onSend = async () => {
    props.onSend();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!props.disabled) {
      switch (e.code) {
        case "Enter":
          onSend();
          break;
        default:
          break;
      }
    }
  };

  const transcribeRecord = async (formData: FormData) => {
    try {
      const data = JSON.parse(await transcribe({ formData }));
      data.transcription && props.setInputValue(props.inputValue + data.transcription);
      setRecordStatus(0);
    } catch (err: any) {
      console.error(err);
      setRecordStatus(0); // failed!
    }
  };

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);

      newMediaRecorder.start();
      setRecordStatus(1);

      newMediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      newMediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const audioFile = new Blob([audioBlob], { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio_chunk", audioFile, "recording.webm");
        transcribeRecord(formData);
        audioChunks.current = [];
      };
    });
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      setRecordStatus(2);
      mediaRecorder.stop();
    }
  };

  function isSupportedBrowser() {
    const userAgent = navigator.userAgent;

    // Check for Chrome
    const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);

    // Check for Edge (includes both old EdgeHTML and Chromium-based versions)
    const isEdge = /Edg/.test(userAgent);

    return isChrome || isEdge;
  }

  const handleRecord = () => {
    if (isSupportedBrowser()) {
      switch (recordStatus) {
        case 0: // start
          handleStartRecording();
          break;
        case 1:
          handleStopRecording();
          break;
        case 2:
          break;
        default:
          break;
      }
    } else {
      (
        window as unknown as MyWindow
      ).transcriptionNotSupportedModal.showModal();
    }
  };

  return (
    <div>
      <div className='join w-full'>
        <TextArea
          autoSize={true}
          className='input join-item w-full text-lg focus:outline-none'
          style={{ maxHeight: "300px", lineHeight: "28px" }}
          placeholder='Chat with TOMAS...'
          value={props.inputValue}
          onChange={(e) => onInputBoxChange(e)}
          onKeyUp={(e) => handleKeyPress(e)}
        />
        <button
          className='btn btn-ghost join-item h-[38px] min-h-[38px]'
          onClick={() => {
            handleRecord();
          }}
          disabled={recordStatus === 2 || props.disabled}
        >
          {recordStatus === 0 ? (
            <StartRecord />
          ) : recordStatus === 1 ? (
            <StopRecord />
          ) : (
            <Loading />
          )}
        </button>
        <button
          className='btn join-item h-[38px] min-h-[38px]'
          disabled={props.disabled}
          onClick={() => onSend()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='inline-block w-5 h-5 stroke-current'
            viewBox='0 0 384 512'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z'
            />
          </svg>
        </button>
      </div>
      <dialog id='transcriptionNotSupportedModal' className='modal'>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>Notice</h3>
          <p className='py-4'>
            Your browser is not supported for transcription. Please use Google
            Chrome or Microsoft Edge instead.
          </p>
          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default forwardRef(InputBox);
