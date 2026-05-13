import SectionHeader from '../SectionHeader/SectionHeader';
import PropertyCard from './PropertyCard';
import { properties } from '../../data/properties';
import styles from './Properties.module.scss';

export default function Properties() {
  return (
    <section id="properties-section" className={styles.section}>
      <div className="container">
        <SectionHeader
          label="Destaques"
          title={
            <>
              Imóveis selecionados<br />para você
            </>
          }
        />

        <div className={styles.grid}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
