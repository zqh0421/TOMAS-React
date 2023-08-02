export function StartRecord() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 h-5 stroke-current"
      viewBox="0 0 384 512">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"
      />
    </svg>
  )
}

export function StopRecord() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 h-5 stroke-current"
      viewBox="0 0 384 512">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
      />
    </svg>
  )
}

export function Loading(query: {className?: string}) {
  return (
    <span className={`loading loading-spinner loading-l ${query.className}`}></span>
  )
}

