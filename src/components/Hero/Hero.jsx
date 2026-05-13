import Header from '../Header/Header';
import Button from '../Button/Button';
import { ArrowRight } from '../Icons/Icons';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: 'url("/assets/img/hero.png")' }}
    >
      <Header />

      <div className={styles.container}>
        <div className={`${styles.content} animate-fade-in`}>
          <div className={styles.eyebrow}>
            <span>Plataforma imobiliária</span>
          </div>

          <h1 className={styles.title}>
            Encontre o lar<br />
            que <em>merece</em><br />
            a sua história.
          </h1>

          <p className={styles.description}>
            Conectamos você ao seu próximo imóvel com segurança e transparência,
            do primeiro clique à assinatura do contrato.
          </p>

          <div className={styles.actions}>
            <Button href="#properties-section" variant="cream" as="a">
              Explorar Imóveis
              <ArrowRight />
            </Button>
            <Button to="/anunciar" variant="ghost-white">
              Anunciar Imóvel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
