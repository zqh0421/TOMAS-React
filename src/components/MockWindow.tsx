import { Input, AutoComplete } from "antd";
import type { InputRef } from "antd";
import { Loading } from "./recordStatus";
import { useState, useRef, useEffect } from "react";
import { navigate } from "../apis/chat";
import type { ActionComponent } from "../apis/chat";
import { answerForSelect, confirmAnswer } from "../apis/chat";
import RecordBtn from "./RecordBtn";

const { TextArea } = Input;

const MockWindow = (props: {
  className: string;
  content?: string;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
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
  const [urlValue, setUrlValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [html, setHtml] = useState<string>("")
  const { content, stage, setStage } = props;
  const inputRef = useRef<InputRef>(null);

  const [open, setOpen] = useState<"confirm" | "input" | "">("");
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
    if (stage === "questionForSelect") {
      setHtml(`${props.components!=null && props.components.map(component => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(component.html, 'text/html').querySelectorAll('body > *')[0]
        const elements = doc.querySelectorAll('*')
        elements.forEach((element, index) => {
          element.setAttribute('interactive_i', component.i)
        })
        console.log(doc.outerHTML)
        return doc.outerHTML
      })}`)
    } else if (stage === "requestConfirmation") {
      setHtml(`
        <h2 class="text-3xl leading-loose font-bold">${content}</h2>
      `);
      setOpen("confirm")
    } else if (stage==="questionForInput") {
      setOpen("input")
    } else if (stage) {
      console.log(props.component)
      setHtml(`<h2 class="text-3xl leading-loose font-bold">${content}</h2>`)
    } else {
      setHtml(``)
    }
  }, [stage, content])

  const handleConfirmation = (response: string) => {
    props.setIsProcessing(true)
    if (response === "YES") {
      setConfirmLoadingYes(true)
    } else {
      setConfirmLoadingNo(true)
    }
    props.component && confirmAnswer({
      content: response.toLowerCase(),
      component: props.component,
      actionValue: props.actionValue,
    }).then((res) => {
      props.dataUpdate(res)
      setConfirmLoadingYes(false)
      setConfirmLoadingNo(false)
      setOpen("")
      props.setIsProcessing(false)
    });
    console.log(response)
  }

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
    console.log(e.target)
    const iAttribute = (e.target as HTMLElement).getAttribute("interactive_i")
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
    if (!urlValue) {
      console.log("Please input URL here!!!");
      return;
    }
    console.log(urlValue);
    setIsDisabled(true);
    // send url to backend
    try {
      const result = await navigate({ url: urlValue });
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
        { urlValue ? <Input
          placeholder='Input URL here.'
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
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
          value={urlValue}
          options={[
            { value: "https://www.greyhound.com" },
            { value: "https://www.cinemark.com" },
          ]}
          onChange={(value) => setUrlValue(value)}
          style={{ width: "25vw" }}
          autoFocus
        />}
      </div>
      <div className="h-[calc(100%-1.75rem)] bg-base-200 overflow-y-auto py-4 px-8">
        <div
          dangerouslySetInnerHTML={{
            __html:
              stage ? `<h1 class="text-2xl leading-loose font-bold">- ${stage}</h1>` : `<h1>Empty</h1>`
          }}
          className='bg-base-200'
        />
        <div className={`${open!=="" ? "grid grid-rows-2" : ""}`}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                html ? html : ``
            }}
            className='bg-base-200 text-center'
            onClick={(e) => handleWindowClick(e)}
          />
          <div className={`w-full flex justify-around my-4 ${open==="confirm" ? "block" : "hidden"}`}>
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
          <div className={`w-full flex flex-col justify-around items-center gap-6 my-4 ${open==="input" ? "block" : "hidden"}`}>
            <RecordBtn
              inputValue={props.inputValue}
              setInputValue={props.setInputValue}
              disabled={props.isProcessing}
              className="btn-circle btn-ghost btn-lg"
            />
            <div>
            <TextArea
              autoSize={true}
              className='input w-[30vw] text-lg focus:outline-none'
              style={{ maxHeight: "300px", lineHeight: "28px" }}
              placeholder='Chat with TOMAS...'
              value={props.inputValue}
              onChange={(e) => props.setInputValue(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
            />
                
                {/* <button
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
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockWindow;
