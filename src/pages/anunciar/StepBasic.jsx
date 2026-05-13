import styles from '../AnunciarPage.module.scss';

export default function StepBasic({ form, onChange, errors }) {
  const fieldClass = (name) =>
    `${styles.fieldInput} ${errors[name] ? styles.error : ''}`;

  return (
    <div>
      <div className={styles.stepHeader}>
        <p className={styles.stepNum}>Etapa 01 / 04</p>
        <h2 className={styles.stepTitle}>Informações básicas</h2>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="title">
          Título do Anúncio <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="title"
          className={fieldClass('title')}
          placeholder="Ex: Apartamento moderno com 3 quartos em Ponta Negra"
          value={form.title}
          onChange={onChange}
          required
        />
      </div>

      <div className={styles.fieldGrid2}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="propertyType">
            Tipo de Imóvel <span className={styles.required}>*</span>
          </label>
          <select
            id="propertyType"
            className={`${styles.fieldSelect} ${
              errors.propertyType ? styles.error : ''
            }`}
            value={form.propertyType}
            onChange={onChange}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="comercial">Comercial</option>
            <option value="terreno">Terreno</option>
            <option value="cobertura">Cobertura</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            Operação <span className={styles.required}>*</span>
          </label>
          <div className={styles.radioGroup}>
            <div className={styles.radioOption}>
              <input
                type="radio"
                name="operation"
                value="venda"
                id="venda"
                checked={form.operation === 'venda'}
                onChange={onChange}
              />
              <label htmlFor="venda">Venda</label>
            </div>
            <div className={styles.radioOption}>
              <input
                type="radio"
                name="operation"
                value="aluguel"
                id="aluguel"
                checked={form.operation === 'aluguel'}
                onChange={onChange}
              />
              <label htmlFor="aluguel">Aluguel</label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="price">
          Preço (R$) <span className={styles.required}>*</span>
        </label>
        <input
          type="number"
          id="price"
          className={fieldClass('price')}
          placeholder="850000"
          value={form.price}
          onChange={onChange}
          min="1"
          required
        />
        <p className={styles.fieldHint}>
          Para aluguel, informe o valor mensal.
        </p>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="description">
          Descrição <span className={styles.required}>*</span>
        </label>
        <textarea
          id="description"
          className={`${styles.fieldTextarea} ${
            errors.description ? styles.error : ''
          }`}
          placeholder="Descreva os diferenciais do imóvel, vista, acabamentos, localização..."
          value={form.description}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
