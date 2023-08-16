import React, {
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import { Input } from "antd";
import RecordBtn from './RecordBtn'
import SendBtn from "./SendBtn";

export interface InputBoxRef {
  getInputValue: () => string | undefined;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  clearInput: () => void;
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
  useImperativeHandle(ref, () => ({
    getInputValue: () => props.inputValue,
    handleKeyPress: (e: React.KeyboardEvent) => handleKeyPress(e),
    clearInput: () => props.setInputValue(""),
  }));

  const onInputBoxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.disabled) return
    props.setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!props.disabled) {
      switch (e.code) {
        case "Enter":
          e.preventDefault()
          props.onSend();
          break;
        default:
          break;
      }
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
          disabled={props.disabled}
        />
        <RecordBtn
          inputValue={props.inputValue} setInputValue={props.setInputValue}
          disabled={props.disabled}
          className="btn-ghost join-item h-[38px] min-h-[38px]"
        />
        <SendBtn
          onSend={() => props.onSend()}
          disabled={props.disabled && props.inputValue.trim().length > 0}
          className="join-item h-[38px] min-h-[38px]"
        />
      </div>
    </div>
  );
};

export default forwardRef(InputBox);
