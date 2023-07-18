const Footer = (props: { className: string }) => {
  return (
    <footer className={`footer footer-center p-4 bg-neutral text-neutral-content ${props.className}`}>
      <div className="grid-flow-col">
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  )
}

export default Footer;