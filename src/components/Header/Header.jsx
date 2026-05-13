import { Link } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
import styles from './Header.module.scss';

export default function Header() {
  const [mobileOpen, toggleMobile, setMobileOpen] = useToggle(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          IMOBI<span className={styles.dot}>·</span>LAR
        </Link>

        <ul className={styles.links}>
          <li>
            <a href="#properties-section">Comprar</a>
          </li>
          <li>
            <a href="#properties-section">Alugar</a>
          </li>
          <li>
            <Link to="/anunciar">Anunciar</Link>
          </li>
        </ul>

        <div className={styles.cta}>
          <Link to="/login" className={styles.navOutline}>
            Entrar
          </Link>
          <Link to="/cadastro" className={styles.navSolid}>
            Cadastre-se
          </Link>
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
          onClick={toggleMobile}
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <a href="#properties-section" onClick={closeMobile}>
          Comprar
        </a>
        <a href="#properties-section" onClick={closeMobile}>
          Alugar
        </a>
        <Link to="/anunciar" onClick={closeMobile}>
          Anunciar
        </Link>
        <div className={styles.mobileCta}>
          <Link to="/login" className={styles.navOutline} onClick={closeMobile}>
            Entrar
          </Link>
          <Link to="/cadastro" className={styles.navSolid} onClick={closeMobile}>
            Cadastre-se
          </Link>
        </div>
      </div>
    </header>
  );
}
