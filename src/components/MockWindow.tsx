const MockWindow = (props: { className: string, html?: string, title?: string }) => {
  const defaultTitle = "TOMAS";
  const defaultHTML = '<div class="justify-center items-center px-4 py-16 h-[100%] text-xl"><p>Hello, my name is&nbsp<span class="text-primary-focus">TOMAS</span>.</p><p>Feel free to ask me in the chat box! :)</p></div>'
  // const defaultHTML = `<div class="bg-gray-100 p-4"> <h4 class="text-lg font-bold mb-2">Greyhound on:</h4> <ul class="list-disc list-inside"> <li><a href="https://www.facebook.com/GreyhoundBus" class="text-blue-500 hover:text-blue-700">Facebook</a></li> <li><a href="http://instagram.com/greyhoundlines/" class="text-purple-500 hover:text-purple-700">Instagram</a></li> <li><a href="http://www.youtube.com/user/GoGreyhound" class="text-red-500 hover:text-red-700">YouTube</a></li> <li><a href="https://www.linkedin.com/company/greyhound-lines-inc." class="text-blue-800 hover:text-blue-900">LinkedIn</a></li> <li><a href="http://twitter.com/GreyhoundBus" class="text-blue-400 hover:text-blue-600">Twitter</a></li> <li><a href="https://www.levelaccess.com/greyhound" class="text-indigo-500 hover:text-indigo-700">Level Access</a></li> </ul> </div>`
  return (
    <div className={`mockup-window border bg-base-300 overflow-y-auto relative ${props.className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 leading-[3rem] text-neutral-500">{props.title && typeof(props.title) === "string" ? props.title : defaultTitle}</div>
      <div
        dangerouslySetInnerHTML={{ __html: props.html && typeof(props.html) === "string" ? props.html : defaultHTML }}
        className="h-[calc(100%-1.75rem)] bg-base-200"
      />
    </div>
  )
}

export default MockWindow;