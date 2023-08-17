import { Input, AutoComplete } from "antd";
import type { InputRef } from "antd";
import { Loading } from "./recordStatus";
import { useState, useRef, useEffect } from "react";
import { navigate } from "../apis/chat";
import type { ActionComponent, SelectableComponent } from "../apis/chat";
import { answerForSelect, confirmAnswer } from "../apis/chat";
import RecordBtn from "./RecordBtn";
import SendBtn from "./SendBtn";
import { motion } from 'framer-motion';

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
  components: SelectableComponent[] | null;
  setComponents: React.Dispatch<React.SetStateAction<SelectableComponent[] | null>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  dataUpdate: Function;
  actionValue: string;
  onSend: Function | undefined;
  handleKeyPress: Function | undefined;
  open: "input" | "confirm" | "";
  setOpen: React.Dispatch<React.SetStateAction<"input" | "confirm" | "">>;
  isChatShown: boolean;
}) => {
  const [urlValue, setUrlValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [html, setHtml] = useState<string>("")
  const { content, stage, setStage, open, setOpen } = props;
  const inputRef = useRef<InputRef>(null);
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
  
  interface TableData {
    i: string,
    html: string
  }

  const generateTable = (components: SelectableComponent[]) => {
    let table: TableData[] = [];
    components.forEach(component => {
      const row = generateTableRow(component.data, component.i)
      table = [...table, {
        i: component.i,
        html: row
      }]
    })
    return table
  }

  const generateTableRow = (data: string | Record<string, string | string[]>, i: string) => {
    let temp = `<tr interactive_i="${i}" class="cursor-pointer hover:bg-slate-500 hover:text-neutral-50 hover:font-bold">`
    if (typeof data === "string") {
      temp += `<td interactive_i="${i}" class="border px-6 py-3">`;
      temp += data;
      temp += '</td>';
    } else {
      for (const key in data) {
        console.log("key: " + key)
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          console.log(data, key)
          const value = data[key];
          temp += `<td interactive_i="${i}" class="border px-6 py-3 font-bold" >${key}</td>`;
          if (Array.isArray(value)) {
            temp += `<td interactive_i="${i}" class="border px-6 py-3" >`;
            temp += value.join(', ');
            temp += '</td>';
          } else {
            temp += `<td interactive_i="${i}" >${value}</td>`;
          }
        }
      }
    }
    temp += '</tr>'
    return temp
  }

  useEffect(() => {
    if (stage === "questionForSelect") {
      if (props.components) {
        const tableData = generateTable(props.components)
        setHtml(`
          <h2 class="text-3xl leading-loose font-bold">${content}</h2>
          <table class="mt-3 table-auto w-full text-xl" >
            ${tableData.map(row => row.html)}
          </table>`)
      }
      
    } else if (stage === "requestConfirmation") {
      setHtml(`
        <h2 class="text-3xl leading-loose font-bold">${content}</h2>
      `);
      setOpen("confirm")
    } else if (stage==="questionForInput") {
      setHtml(`<h2 class="text-3xl leading-loose font-bold">${content}</h2>`)
      setOpen("input")
    } else if (stage==="navigate") {
      setHtml(`<h2 class="text-3xl leading-loose font-bold">${content}</h2>`)
      setOpen("input")
    } else if (stage) {
      console.log(props.component)
      setHtml(`<h2 class="text-3xl leading-loose font-bold">${content}</h2>`)
    } else {
      setHtml(`
        <h2 class="text-3xl leading-loose font-bold">
          Please first tell me which website you want to learn more.
        </h2>`
      )
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
        answerForSelect({ content: typeof component.data === "string" ? component.data : component.description, component: component }).then(
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
      <motion.div
        layout
        className='absolute top-0 left-[calc(50%-12.5vw)] leading-[3rem] text-neutral-500'
      >
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
          style={{ width: `25vw` }}
          autoFocus
        />}
      </motion.div>
      <div className="h-[calc(100%-1.75rem)] bg-base-200 overflow-y-auto py-4 px-8">
        <div
          dangerouslySetInnerHTML={{
            __html:
              `<h1 class="text-2xl leading-loose font-bold">${stage ? `- ${stage}` : ''}</h1>`
          }}
          className='bg-base-200'
        />
        <div className={`flex flex-col gap-6 mt-12`}>
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
            <div className="grid grid-cols-2 gap-20">
                <RecordBtn
                  inputValue={props.inputValue}
                  setInputValue={props.setInputValue}
                  disabled={props.isProcessing}
                  className="btn-circle btn-ghost btn-lg"
                />
                <SendBtn
                  onSend={async () => {
                    if (props.onSend) {
                      await props.onSend()
                    } else {
                      console.error("Sending ERROR!")
                    }
                  }}
                  disabled={props.isProcessing && props.inputValue.trim().length <= 0}
                  className="btn-circle btn-ghost btn-lg"
                />
            </div>
            <TextArea
              autoSize={true}
              className='input w-[30vw] text-xl focus:outline-none'
              style={{ padding: "16px 8px", minHeight: "60px", maxHeight: "300px", lineHeight: "28px" }}
              placeholder='Chat with TOMAS...'
              value={props.inputValue}
              onChange={(e) => !props.isProcessing && props.setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (props && props.handleKeyPress) {
                  props.handleKeyPress(e)
                }
              }}
              disabled={props.isProcessing}
            />
          </div>
          <div className="w-full flex items-center justify-center mt-4">
            <span className={`loading loading-lg loading-dots ${props.isProcessing || isDisabled ? "block" : "hidden"}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockWindow;
