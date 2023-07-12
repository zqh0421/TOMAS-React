import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react'

export interface InputBoxRef {
  getInputValue: () => string | undefined;
  clearInput: () => void;
}

const InputBox = (props: { onSend: Function }, ref: Ref<unknown> | undefined) => {
  const [inputValue, setInputValue] = useState('')

  useImperativeHandle(ref, () => ({
    getInputValue: () => inputValue,
    clearInput: () => setInputValue('')
  }));

  const onInputBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSend = () => {
    props.onSend()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "Enter": onSend(); break;
      default: break;
    }
  }

  return (
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
      <button className="btn join-item" onClick={() => onSend()}>Send</button>
    </div>
  )
}

export default forwardRef(InputBox);