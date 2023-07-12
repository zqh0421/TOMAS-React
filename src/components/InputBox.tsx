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
    <div>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">In the future version, whiper-2 speech-to-text will be supported.</p>
          <p className="py-4">Click the button below to close.</p>
          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
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
      <button className="btn btn-ghost join-item" onClick={()=>window.my_modal_4.showModal()}>
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 stroke-current" viewBox="0 0 384 512"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/></svg>
      </button>
      <button className="btn join-item" onClick={() => onSend()}>Send</button>
    </div>
    </div>
  )
}

export default forwardRef(InputBox);