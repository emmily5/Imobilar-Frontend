import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../components/Icons/Icons';
import styles from '../AnunciarPage.module.scss';

export default function AnunciarHeader() {
  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.headerLogo}>
            IMOBI<span className={styles.dot}>·</span>LAR
          </Link>
          <Link to="/" className={styles.headerBack}>
            <ArrowLeft />
            Voltar ao início
          </Link>
        </div>
      </header>

      <div className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <div className={styles.pageEyebrow}>
            <span>Anunciar gratuitamente</span>
          </div>
          <h1 className={styles.pageTitle}>
            Anuncie seu imóvel<br />e alcance os compradores certos
          </h1>
          <p className={styles.pageSubtitle}>
            Preencha as etapas abaixo e seu imóvel estará disponível para
            milhares de potenciais compradores e inquilinos.
          </p>
        </div>
      </div>
    </>
  );
}
