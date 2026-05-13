import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>IMOBILAR</div>
            <p className={styles.description}>
              A plataforma completa para suas transações imobiliárias.
              Conectando pessoas ao seu próximo lar com segurança e
              transparência.
            </p>
          </div>

          <div>
            <h4 className={styles.heading}>Institucional</h4>
            <ul className={styles.links}>
              <li>
                <a href="#" className={styles.link}>
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Explorar</h4>
            <ul className={styles.links}>
              <li>
                <a href="#" className={styles.link}>
                  Casas à Venda
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Apartamentos
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Imóveis Comerciais
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Contato</h4>
            <ul className={styles.contacts}>
              <li>contato@imobilar.com</li>
              <li>(84) 99999-9999</li>
              <li>
                <a href="#" className={styles.link}>
                  Central de Ajuda
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2025 IMOBILAR. Todos os direitos reservados.</p>
          <p>Feito com cuidado para conectar pessoas a lares.</p>
        </div>
      </div>
    </footer>
  );
}
