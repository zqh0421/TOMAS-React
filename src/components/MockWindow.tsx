const MockWindow = (props: { className: string }) => {
  const html = '<div class="flex justify-center px-4 py-16 bg-base-200 text-lg">Hello, <span>TOMAS</span>.</div>'
  const className = "[&>div>span]:text-red-500"
  return (
    <div className={`mockup-window border bg-base-300 ${props.className}`}>
      <div className="flex justify-center px-4 py-16 bg-base-200">Hello!</div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={className}
      />
    </div>
  )
}

export default MockWindow;