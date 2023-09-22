import { removeChat } from "../apis/chat";

const NavBar = (props: {
    className: string,
    isChatShown: boolean,
    isConfirmationEnabled: boolean,
    setIsConfirmationEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    stage: string,
    setIsChatShown: React.Dispatch<React.SetStateAction<boolean>>
  }) => {

  const deleteCurrentChat = async () => {
    await removeChat()
    window.location.reload()
  }
  return (
    <div className={`navbar bg-neutral text-neutral-content ${props.className}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box min-w-min">
            <li></li>
            <li className="form-control w-44 lg:w-60 min-w-min">
                <label className="label cursor-pointer min-w-min w-full flex box-border justify-between" >
                  <span className="label-text">Debugging Mode</span> 
                  <input type="checkbox" className="hidden lg:block toggle toggle-md" checked={props.isChatShown} onChange={() => props.setIsChatShown(!props.isChatShown)} />
                </label>
                <label className="label cursor-pointer min-w-min w-full flex box-border justify-between" >
                  <span className="label-text">Confirmation Enabled</span> 
                  <input type="checkbox" className="hidden lg:block toggle toggle-md" checked={props.isConfirmationEnabled} onChange={() => props.setIsConfirmationEnabled(!props.isConfirmationEnabled)} />
                </label>
            </li>
            <li><a>About</a></li>
          </ul>
        </div>
        <div className="hidden lg:flex lg:flex-row lg:gap-4 form-control min-w-min">
          <label className="label cursor-pointer min-w-min flex" >
            <input type="checkbox" className="toggle toggle-primary toggle-md mr-2" checked={props.isChatShown} onChange={() => props.setIsChatShown(!props.isChatShown)} />
            <span className="label-text text-neutral-50">Debugging Mode</span> 
          </label>
          <label className="label cursor-pointer min-w-min flex" >
            <input type="checkbox" className="toggle toggle-secondary toggle-md mr-2" checked={props.isConfirmationEnabled} onChange={() => props.setIsConfirmationEnabled(!props.isConfirmationEnabled)} />
            <span className="label-text text-neutral-50">Confirmation Enabled</span> 
          </label>
          <span className="label-text text-neutral-50">{props.isChatShown && props.stage ? `- ${props.stage}` : ''}</span> 
      </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">TOMAS</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-square" onClick={() => deleteCurrentChat()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#d5dae1" viewBox="0 0 448 512" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
        </button>
      </div>
    </div>
  )
}

export default NavBar;