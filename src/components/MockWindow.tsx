import { Input, AutoComplete } from "antd";
import type { InputRef } from "antd";
import { Loading } from "./recordStatus";
import { useState, useRef, useEffect } from "react";
import { navigate } from "../apis/chat";
import type { ActionComponent } from "../apis/chat";
import { answerForSelect, confirmAnswer } from "../apis/chat";

const MockWindow = (props: {
  className: string;
  content?: string;
  html?: string;
  title?: string;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  component: ActionComponent | null;
  setComponent: React.Dispatch<React.SetStateAction<ActionComponent | null>>;
  components: ActionComponent[] | null;
  setComponents: React.Dispatch<React.SetStateAction<ActionComponent[] | null>>;
  componentOrComponents: "component" | "components" | "error";
  setComponentOrComponents: React.Dispatch<React.SetStateAction<"component" | "components" | "error">>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  dataUpdate: Function;
  actionValue: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { setStage } = props;
  const inputRef = useRef<InputRef>(null);

  const [open, setOpen] = useState(false);
  const [confirmLoadingYes, setConfirmLoadingYes] = useState(false);
  const [confirmLoadingNo, setConfirmLoadingNo] = useState(false);
  const suffix = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-4'
      viewBox='0 0 512 512'
    >
      <path d='M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z' />
    </svg>
  );

  useEffect(() => {
    if (props.stage === "requestConfirmation") {
      setOpen(true)
    }
  }, [props.html, props.stage])

  const handleConfirmation = (response: string) => {
    props.setIsProcessing(true)
    if (response === "YES") {
      setConfirmLoadingYes(true)
    } else {
      setConfirmLoadingNo(true)
    }
    props.component && confirmAnswer({
      content: response,
      component: props.component,
      actionValue: props.actionValue,
    }).then((res) => {
      props.dataUpdate(res)
      setConfirmLoadingYes(false)
      setConfirmLoadingNo(false)
      setOpen(false)
      props.setIsProcessing(false)
    });
    console.log(response)
  }

  const defaultHTML = `<h1>Empty</h1>`;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "Enter":
        onHandleGoTo();
        break;
      default:
        break;

    }
  };

  const handleWindowClick = (e: React.MouseEvent) => {
    if (props.isProcessing) return
    if (props.stage !== "questionForSelect") return
    const iAttribute = (e.target as HTMLElement).getAttribute("i")
    console.log(iAttribute)
    props.components?.forEach((component) => {
      if (component.i === iAttribute) {
        props.setIsProcessing(true)
        answerForSelect({ content: component.description, component: component }).then(
          (res) => {
            props.dataUpdate(res)
            props.setIsProcessing(false)
          }
        );
        return
      }
    })
  }

  const onHandleGoTo = async () => {
    if (!inputValue) {
      console.log("Please input URL here!!!");
      return;
    }
    console.log(inputValue);
    setIsDisabled(true);
    // send url to backend
    try {
      const result = await navigate({ url: inputValue });
      setStage(result.type);
      console.log("Send url to backend...");
      setIsDisabled(false); 
      inputRef.current && inputRef.current.blur();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return (
    <div
      className={`mockup-window border bg-base-300 relative ${props.className}`}
    >
      <div className='absolute top-0 left-1/2 -translate-x-1/2 leading-[3rem] text-neutral-500'>
        { inputValue ? <Input
          placeholder='Input URL here.'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => handleKeyPress(e)}
          style={{ width: "25vw" }}
          suffix={
            <button
              onClick={() => onHandleGoTo()}
              disabled={isDisabled}
              className={
                "btn btn-link p-0 border-0 h-min min-h-min disabled:bg-transparent"
              }
            >
              {isDisabled ? <Loading className='h-min min-h-min' /> : suffix}
            </button>
          }
          disabled={isDisabled}
          ref={inputRef}
          autoFocus
        /> :
        <AutoComplete
          placeholder='Input URL here.'
          value={inputValue}
          options={[
            { value: "https://www.greyhound.com" },
            { value: "https://www.cinemark.com" },
          ]}
          onChange={(value) => setInputValue(value)}
          style={{ width: "25vw" }}
          autoFocus
        />}
      </div>
      <div className="h-[calc(100%-1.75rem)] bg-base-200 overflow-y-auto py-4 px-8">
        <div
          dangerouslySetInnerHTML={{
            __html:
              props.html && typeof props.html === "string"
                ? props.html
                : defaultHTML,
          }}
          className='bg-base-200'
          onClick={(e) => handleWindowClick(e)}
        />
        <div className={`w-full flex justify-around my-4 ${open ? "block" : "hidden"}`}>
          <button
            onClick={() => handleConfirmation("YES")}
            className={`btn btn-outline btn-md btn-wide ${confirmLoadingNo ? "btn-disabled" : ""}`}
            disabled={confirmLoadingYes || confirmLoadingNo}
          >
            YES {confirmLoadingYes && <Loading />}
          </button>
          <button
            onClick={() => handleConfirmation("NO")}
            className={`btn btn-outline btn-md btn-wide ${confirmLoadingYes ? "btn-disabled" : ""}`}
            disabled={confirmLoadingYes || confirmLoadingNo}
          >
            NO {confirmLoadingNo && <Loading />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockWindow;
