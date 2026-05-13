import { MapPin, Bed, Bath, Ruler, Star } from '../Icons/Icons';
import styles from './Properties.module.scss';

export default function PropertyCard({ property }) {
  const {
    name,
    image,
    address,
    bedrooms,
    bathrooms,
    area,
    price,
    priceSuffix,
    type,
    owner,
  } = property;

  return (
    <div className={`${styles.card} animate-slide-up`}>
      <div className={styles.image}>
        <img src={image} alt={name} />
        <span
          className={`${styles.badge} ${
            type === 'rent' ? styles.badgeRent : styles.badgeSale
          }`}
        >
          {type === 'rent' ? 'Aluguel' : 'Venda'}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>

        <p className={styles.address}>
          <MapPin />
          {address}
        </p>

        <div className={styles.info}>
          {bedrooms !== undefined && (
            <span className={styles.feature}>
              <Bed />
              {bedrooms} quartos
            </span>
          )}
          {bathrooms !== undefined && (
            <span className={styles.feature}>
              <Bath />
              {bathrooms} banheiros
            </span>
          )}
          <span className={styles.feature}>
            <Ruler />
            {area} m²
          </span>
        </div>

        <div className={styles.price}>
          {price}
          {priceSuffix && <small>{priceSuffix}</small>}
        </div>

        <div className={styles.owner}>
          <div className={styles.avatar}>
            <img src={owner.avatar} alt={owner.name} />
          </div>
          <div className={styles.ownerDetails}>
            <p className={styles.ownerName}>{owner.name}</p>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {Array.from({ length: owner.stars }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <span>{owner.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
