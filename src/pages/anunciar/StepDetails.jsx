import styles from '../AnunciarPage.module.scss';

const STATES = [
  ['AC', 'Acre'], ['AL', 'Alagoas'], ['AP', 'Amapá'], ['AM', 'Amazonas'],
  ['BA', 'Bahia'], ['CE', 'Ceará'], ['DF', 'Distrito Federal'],
  ['ES', 'Espírito Santo'], ['GO', 'Goiás'], ['MA', 'Maranhão'],
  ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'], ['MG', 'Minas Gerais'],
  ['PA', 'Pará'], ['PB', 'Paraíba'], ['PR', 'Paraná'], ['PE', 'Pernambuco'],
  ['PI', 'Piauí'], ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'], ['RO', 'Rondônia'], ['RR', 'Roraima'],
  ['SC', 'Santa Catarina'], ['SP', 'São Paulo'], ['SE', 'Sergipe'],
  ['TO', 'Tocantins'],
];

const AMENITIES = [
  ['piscina', 'Piscina'],
  ['churrasqueira', 'Churrasqueira'],
  ['mobiliado', 'Mobiliado'],
  ['academia', 'Academia'],
  ['portaria', 'Portaria 24h'],
  ['pet', 'Aceita Pet'],
  ['varanda', 'Varanda'],
  ['elevador', 'Elevador'],
];

export default function StepDetails({ form, onChange, errors }) {
  const fieldClass = (name) =>
    `${styles.fieldInput} ${errors[name] ? styles.error : ''}`;

  const isChecked = (value) => form.amenities.includes(value);

  return (
    <div>
      <div className={styles.stepHeader}>
        <p className={styles.stepNum}>Etapa 02 / 04</p>
        <h2 className={styles.stepTitle}>Localização & características</h2>
      </div>

      <p className={styles.sectionLabel}>Endereço</p>

      <div className={styles.fieldGrid2}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="cep">
            CEP <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="cep"
            className={fieldClass('cep')}
            placeholder="00000-000"
            value={form.cep}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="address">
            Endereço <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="address"
            className={fieldClass('address')}
            placeholder="Rua, Avenida..."
            value={form.address}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className={styles.fieldGrid3}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="number">
            Número <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="number"
            className={fieldClass('number')}
            placeholder="123"
            value={form.number}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="neighborhood">
            Bairro <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="neighborhood"
            className={fieldClass('neighborhood')}
            placeholder="Ponta Negra"
            value={form.neighborhood}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="complement">
            Complemento
          </label>
          <input
            type="text"
            id="complement"
            className={styles.fieldInput}
            placeholder="Apto 302"
            value={form.complement}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={styles.fieldGrid2}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="city">
            Cidade <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="city"
            className={fieldClass('city')}
            placeholder="Natal"
            value={form.city}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="state">
            Estado <span className={styles.required}>*</span>
          </label>
          <select
            id="state"
            className={`${styles.fieldSelect} ${
              errors.state ? styles.error : ''
            }`}
            value={form.state}
            onChange={onChange}
            required
          >
            <option value="">Selecione</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={styles.sectionLabel}>Características</p>

      <div className={styles.fieldGrid3}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="bedrooms">
            Quartos
          </label>
          <input
            type="number"
            id="bedrooms"
            className={styles.fieldInput}
            placeholder="3"
            min="0"
            value={form.bedrooms}
            onChange={onChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="bathrooms">
            Banheiros
          </label>
          <input
            type="number"
            id="bathrooms"
            className={styles.fieldInput}
            placeholder="2"
            min="0"
            value={form.bathrooms}
            onChange={onChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="parking">
            Vagas
          </label>
          <input
            type="number"
            id="parking"
            className={styles.fieldInput}
            placeholder="1"
            min="0"
            value={form.parking}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="area">
          Área Total (m²) <span className={styles.required}>*</span>
        </label>
        <input
          type="number"
          id="area"
          className={fieldClass('area')}
          placeholder="95"
          min="1"
          value={form.area}
          onChange={onChange}
          required
        />
      </div>

      <p className={styles.sectionLabel}>Comodidades</p>

      <div className={styles.checkboxGrid}>
        {AMENITIES.map(([value, label]) => (
          <div
            key={value}
            className={`${styles.checkboxItem} ${
              isChecked(value) ? styles.checked : ''
            }`}
          >
            <input
              type="checkbox"
              name="amenities"
              value={value}
              id={value}
              checked={isChecked(value)}
              onChange={onChange}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
