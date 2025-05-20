const links = [
    {
      icon: "/images/Icons/",
      alt: "LinkedIn",
      href: ""
    },
    {
      icon: "/images/Icons/",
      alt: "Instagram",
      href: ""
    },
    {
      icon: "/images/Icons/",
      alt: "Twitter",
      href: ""
    },
    {
      icon: "/images/Icons/",
      alt: "Facebook",
      href: ""
    },
    {
      icon: "/images/Icons/tiktok.svg",
      alt: "Tik Tok",
      href: ""
    }
]

function FooterSocialMediaLinks() {
  return (
    <nav className="social-media-links">
      {links.map(link => (
        <a href={link.href} key={link.href}>
          <img src={link.icon} alt={link.alt} />
        </a>
      ))}
    </nav>
  )
}

export default FooterSocialMediaLinks;
