const links = [
  {
    icon: "/images/Icons/linkedin.svg",
    alt: "LinkedIn",
    href: "",
  },
  {
    icon: "/images/Icons/instagram.webp",
    alt: "Instagram",
    href: "",
  },
  {
    icon: "/images/Icons/twitter.svg",
    alt: "Twitter",
    href: "",
  },
  {
    icon: "/images/Icons/facebook.png",
    alt: "Facebook",
    href: "",
    scale: 1.2,
  },
  {
    icon: "/images/Icons/tiktok.svg",
    alt: "Tik Tok",
    href: "",
  },
];

function FooterSocialMediaLinks() {
  return (
    <nav className="social-media-links">
      <p>Follow us</p>
      {links.map((link) => (
        <a
          href={link.href}
          key={link.icon}
          style={{
            transform: `scale(${link.scale || 1})`,
          }}
        >
          <img src={link.icon} alt={link.alt} />
        </a>
      ))}
    </nav>
  );
}

export default FooterSocialMediaLinks;
