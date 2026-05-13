import AudienceCard from './AudienceCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import Button from '../Button/Button';
import {
  Search,
  FileText,
  MapPinLg,
  StarOutline,
  TrendingUp,
  LayoutDashboard,
  FileTextLines,
  Heart,
  ArrowRight,
} from '../Icons/Icons';
import { scrollToSection } from '../../utils/validation';
import styles from './Audience.module.scss';

export default function Audience() {
  const buyerBenefits = [
    { icon: <Search />, text: 'Busca inteligente com filtros avançados' },
    { icon: <FileText />, text: 'Propostas e negociações online' },
    { icon: <MapPinLg />, text: 'Assinatura digital do contrato' },
    { icon: <StarOutline />, text: 'Avalie sua experiência de negociação' },
  ];

  const advertiserBenefits = [
    { icon: <TrendingUp />, text: 'Visibilidade máxima para o seu anúncio' },
    { icon: <LayoutDashboard />, text: 'Gestão centralizada de propostas' },
    { icon: <FileTextLines />, text: 'Contratos gerados automaticamente' },
    { icon: <Heart />, text: 'Construa sua reputação na plataforma' },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          label="Para você"
          title={
            <>
              A solução certa<br />para cada momento
            </>
          }
        />

        <div className={styles.grid}>
          <AudienceCard
            label="Para quem busca"
            title={
              <>
                Encontre o imóvel<br />dos seus sonhos
              </>
            }
            benefits={buyerBenefits}
            cta={
              <Button
                variant="primary"
                full
                onClick={() => scrollToSection('properties-section')}
              >
                Explorar Imóveis
                <ArrowRight />
              </Button>
            }
          />

          <AudienceCard
            label="Para quem anuncia"
            title={
              <>
                Alcance mais<br />compradores qualificados
              </>
            }
            benefits={advertiserBenefits}
            cta={
              <Button to="/anunciar" variant="outline" full>
                Anunciar Gratuitamente
                <ArrowRight />
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
