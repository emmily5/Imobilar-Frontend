import { Link } from 'react-router-dom';
import styles from '../AnunciarPage.module.scss';

export default function AnunciarFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerBrand}>IMOBILAR</div>
            <p className={styles.footerDesc}>
              A plataforma completa para suas transações imobiliárias com
              segurança e transparência.
            </p>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Links Rápidos</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/anunciar" className={styles.footerLink}>
                  Anunciar
                </Link>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Imóveis</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#" className={styles.footerLink}>
                  Casas
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Apartamentos
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Comerciais
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Contato</h4>
            <ul className={styles.footerContacts}>
              <li>contato@imobilar.com</li>
              <li>(84) 99999-9999</li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Central de Ajuda
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 IMOBILAR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
