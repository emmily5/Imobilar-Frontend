import SectionHeader from '../SectionHeader/SectionHeader';
import { Search, MessageSquare, FileTextLines, Home } from '../Icons/Icons';
import styles from './Process.module.scss';

const steps = [
  {
    number: '01',
    icon: <Search />,
    title: 'Explore & Anuncie',
    description:
      'Encontre ou anuncie o imóvel perfeito com filtros detalhados e fotos profissionais.',
  },
  {
    number: '02',
    icon: <MessageSquare />,
    title: 'Envie sua Proposta',
    description:
      'Negocie valores e condições diretamente pela plataforma, com total segurança.',
  },
  {
    number: '03',
    icon: <FileTextLines />,
    title: 'Contrato Digital',
    description:
      'Geramos o contrato e coletamos as assinaturas digitais com validade jurídica.',
  },
  {
    number: '04',
    icon: <Home />,
    title: 'Chaves na Mão',
    description:
      'Finalize com segurança e avalie toda a experiência de negociação.',
  },
];

export default function Process() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          label="Como funciona"
          title={
            <>
              Simples, seguro<br />e completamente digital
            </>
          }
          dark
        />

        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.number} className={`${styles.step} animate-slide-up`}>
              <div className={styles.number}>{step.number}</div>
              <div className={styles.iconRing}>{step.icon}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
