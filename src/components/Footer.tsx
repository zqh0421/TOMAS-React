const Footer = (props: { className: string }) => {
  return (
    <footer className={`footer footer-center p-4 bg-neutral text-neutral-content ${props.className}`}>
      <div>
        <p>Copyright © 2023</p>
      </div>
    </footer>
  )
}

export default Footer;