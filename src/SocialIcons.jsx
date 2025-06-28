const socialLinks = [
  { name: 'LinkedIn', icon: 'fab fa-linkedin', url: '#' },
  { name: 'GitHub', icon: 'fab fa-github', url: '#' },
  { name: 'Behance', icon: 'fab fa-behance', url: '#' },
  { name: 'Facebook', icon: 'fab fa-facebook', url: '#' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
];

const SocialIcons = () => {
  return (
    <div className="header__social">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          data-social={link.name.toLowerCase()}
          className="header__icon"
        >
          <i className={link.icon}></i>
          <span className="tooltip">{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;