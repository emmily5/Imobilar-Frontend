import Button from '../Button/Button';
import { Search } from '../Icons/Icons';
import styles from './CTA.module.scss';

const features = [
  { value: '100%', label: 'Seguro' },
  { value: 'Grátis', label: 'Para começar' },
  { value: '24/7', label: 'Suporte' },
  { value: 'Digital', label: 'Contratos' },
];

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Comece agora</span>
        <h2 className={styles.title}>
          Pronto para encontrar<br />o seu próximo lar?
        </h2>
        <p className={styles.description}>
          Crie sua conta gratuitamente e descubra uma nova forma de negociar
          imóveis com segurança e elegância.
        </p>

        <div className={styles.buttons}>
          <Button href="#properties-section" variant="cream" as="a">
            <Search style={{ width: '1rem', height: '1rem' }} />
            Buscar Imóveis
          </Button>
          <Button to="/anunciar" variant="ghost-white">
            Quero Anunciar
          </Button>
        </div>

        <div className={styles.features}>
          {features.map((feature) => (
            <div key={feature.label} className={styles.feature}>
              <strong>{feature.value}</strong>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
