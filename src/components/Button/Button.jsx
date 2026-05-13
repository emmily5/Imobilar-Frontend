import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const variantClass = {
  primary: styles.primary,
  outline: styles.outline,
  cream: styles.cream,
  'ghost-white': styles.ghostWhite,
};

export default function Button({
  children,
  variant = 'primary',
  full = false,
  as = 'button',
  to,
  href,
  className = '',
  ...rest
}) {
  const classes = [styles.btn, variantClass[variant], full && styles.full, className]
    .filter(Boolean)
    .join(' ');

  if (as === 'link' || to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (as === 'a' || href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
