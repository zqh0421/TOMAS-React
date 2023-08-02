import { Input } from 'antd';
import type { InputRef } from 'antd'
import { Loading } from './recordStatus';
import { useState, useRef } from 'react';
import { navigate } from '../apis/screen';

const MockWindow = (props: { className: string, html?: string, title?: string }) => {
    const [inputValue, setInputValue] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const inputRef = useRef<InputRef>(null);
    const suffix = <svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
  // const defaultHTML = '<div class="justify-center items-center px-4 py-16 h-[100%] text-xl"><p>Hello, my name is&nbsp<span class="text-primary-focus">TOMAS</span>.</p><p>Feel free to ask me in the chat box! :)</p></div>'
  const defaultHTML = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Elderly-friendly Website</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
      <style>
          a {
              text-decoration: underline;
              color: blue;
          }
      </style>
  </head>
  <body class="text-lg font-semibold">
      <ul>
          <div>
              <div>
                  <li>
                      <div>
                          <a href="/movies/insidious-the-red-door" class="text-2xl">
                              <span>
                                  Insidious: The Red Door
                              </span>
                          </a>
                          <a href="javascript:void(0)" class="block mt-2 mb-4">
                              <i class="fas fa-info-circle text-blue-500"></i>
                          </a>
                          <div>
                              <div>
                                  <a href="/Membership/SignIn?movieId=92053">
                                      <span>
                                          Add to Watch List
                                      </span>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </li>
                  <!-- Repeated for all movies -->
              </div>
          </div>
          <button aria-label="next" type="button" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Next
          </button>
      </ul>
  </body>
  </html>
  `
//   const defaultHTML = `<ul i="565">
//   <div i="566">
//    <div i="567">
//     <li i="568">
//      <div i="569">
//       <a href="/movies/insidious-the-red-door" i="570">
//        <span i="573">
//         Insidious: The Red Door
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="574">
//       </a>
//       <div i="576">
//        <div i="577">
//         <a href="/Membership/SignIn?movieId=92053" i="578">
//          <span i="583">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="584">
//      <div i="585">
//       <a href="/movies/indiana-jones-and-the-dial-of-destiny" i="586">
//        <span i="589">
//         Indiana Jones and the Dial of Destiny
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="590">
//       </a>
//       <div i="592">
//        <div i="593">
//         <a href="/Membership/SignIn?movieId=92052" i="594">
//          <span i="599">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="600">
//      <div i="601">
//       <a href="/movies/sound-of-freedom" i="602">
//        <span i="605">
//         Sound of Freedom
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="606">
//       </a>
//       <div i="608">
//        <div i="609">
//         <a href="/Membership/SignIn?movieId=93340" i="610">
//          <span i="615">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="616">
//      <div i="617">
//       <a href="/movies/joy-ride-2023" i="618">
//        <span i="621">
//         Joy Ride (2023)
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="622">
//       </a>
//       <div i="624">
//        <div i="625">
//         <a href="/Membership/SignIn?movieId=92452" i="626">
//          <span i="631">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="632">
//      <div i="633">
//       <a href="/movies/mission-impossible-dead-reckoning-part-one" i="634">
//        <div i="637">
//         Advance Tickets
//        </div>
//        <span i="638">
//         Mission: Impossible - Dead Reckoning Part One
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="639">
//       </a>
//       <div i="641">
//        <div i="642">
//         <a href="/Membership/SignIn?movieId=92054" i="643">
//          <span i="648">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="649">
//      <div i="650">
//       <a href="/movies/elemental" i="651">
//        <span i="654">
//         Elemental
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="655">
//       </a>
//       <div i="657">
//        <div i="658">
//         <a href="/Membership/SignIn?movieId=92048" i="659">
//          <span i="664">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="665">
//      <div i="666">
//       <a href="/movies/spider-man-across-the-spider-verse" i="667">
//        <span i="670">
//         Spider-Man: Across the Spider-Verse
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="671">
//       </a>
//       <div i="673">
//        <div i="674">
//         <a href="/Membership/SignIn?movieId=92045" i="675">
//          <span i="680">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="681">
//      <div i="682">
//       <a href="/movies/barbie" i="683">
//        <div i="686">
//         Advance Tickets
//        </div>
//        <span i="687">
//         Barbie
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="688">
//       </a>
//       <div i="690">
//        <div i="691">
//         <a href="/Membership/SignIn?movieId=92056" i="692">
//          <span i="697">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="698">
//      <div i="699">
//       <a href="/movies/oppenheimer" i="700">
//        <div i="703">
//         Advance Tickets
//        </div>
//        <span i="704">
//         Oppenheimer
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="705">
//       </a>
//       <div i="707">
//        <div i="708">
//         <a href="/Membership/SignIn?movieId=92055" i="709">
//          <span i="714">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="715">
//      <div i="716">
//       <a href="/movies/no-hard-feelings" i="717">
//        <span i="720">
//         No Hard Feelings
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="721">
//       </a>
//       <div i="723">
//        <div i="724">
//         <a href="/Membership/SignIn?movieId=92051" i="725">
//          <span i="730">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="731">
//      <div i="732">
//       <a href="/movies/transformers-rise-of-the-beasts" i="733">
//        <span i="736">
//         Transformers: Rise of the Beasts
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="737">
//       </a>
//       <div i="739">
//        <div i="740">
//         <a href="/Membership/SignIn?movieId=92046" i="741">
//          <span i="746">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="747">
//      <div i="748">
//       <a href="/movies/ruby-gillman-teenage-kraken" i="749">
//        <span i="752">
//         Ruby Gillman, Teenage Kraken
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="753">
//       </a>
//       <div i="755">
//        <div i="756">
//         <a href="/Membership/SignIn?movieId=92884" i="757">
//          <span i="762">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="763">
//      <div i="764">
//       <a href="/movies/the-flash" i="765">
//        <span i="768">
//         The Flash
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="769">
//       </a>
//       <div i="771">
//        <div i="772">
//         <a href="/Membership/SignIn?movieId=92049" i="773">
//          <span i="778">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="779">
//      <div i="780">
//       <a href="/movies/the-little-mermaid" i="781">
//        <span i="784">
//         The Little Mermaid
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="785">
//       </a>
//       <div i="787">
//        <div i="788">
//         <a href="/Membership/SignIn?movieId=92042" i="789">
//          <span i="794">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//     <li i="795">
//      <div i="796">
//       <a href="/movies/asteroid-city" i="797">
//        <span i="800">
//         Asteroid City
//        </span>
//       </a>
//       <a href="javascript:void(0)" i="801">
//       </a>
//       <div i="803">
//        <div i="804">
//         <a href="/Membership/SignIn?movieId=93585" i="805">
//          <span i="810">
//           Add to Watch List
//          </span>
//         </a>
//        </div>
//       </div>
//      </div>
//     </li>
//    </div>
//   </div>
//   <button aria-label="next" i="812" type="button">
//    Next
//   </button>
//  </ul>`

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "Enter": onHandleGoTo(); break;
      default: break;
    }
  }

  const onHandleGoTo = () => {
    if (!inputValue) {
        console.log("Please input URL here!!!")
        return;
    }
    console.log(inputValue)
    setIsDisabled(true)
    // send url to backend
    try {
        navigate({ url: inputValue });
        console.log("Send url to backend...")
        setIsDisabled(false)
        inputRef.current && inputRef.current.blur()
      } catch (err) {
        console.error(err);
        return [];
      }
    // setTimeout(() => {
    //     console.log("Send url to backend...")
    //     setIsDisabled(false)
    //     inputRef.current && inputRef.current.blur()
    // }, 1000)
  }

  return (
    <div className={`mockup-window border bg-base-300 relative ${props.className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 leading-[3rem] text-neutral-500">
        <Input
          placeholder="Input URL here."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => handleKeyPress(e)}
          style={{ width: '25vw' }}
          suffix={<button onClick={() => onHandleGoTo()} disabled={isDisabled} className={"btn btn-link p-0 border-0 h-min min-h-min disabled:bg-transparent"}>{isDisabled ? <Loading className="h-min min-h-min" /> : suffix}</button>}
          disabled={isDisabled}
          ref={inputRef}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.html && typeof(props.html) === "string" ? props.html : defaultHTML }}
        className="h-[calc(100%-1.75rem)] bg-base-200 overflow-y-auto p-4"
      />
    </div>
  )
}

export default MockWindow;