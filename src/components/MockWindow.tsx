const MockWindow = (props: { className: string }) => {
  return (
    <div className={`mockup-window border bg-base-300 ${props.className}`}>
      <div className="flex justify-center px-4 py-16 bg-base-200">Hello!</div>
    </div>
  )
}

export default MockWindow;