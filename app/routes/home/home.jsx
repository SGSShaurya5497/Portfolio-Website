import arbTextureLarge from '~/assets/arb-app-large.jpg';
import arbTexturePlaceholder from '~/assets/arb-app-placeholder.jpg';
import arbTexture from '~/assets/arb-app.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { Skills } from './skills';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Backend Developer + DevOps',
    description: `Portfolio of ${config.name} — a backend developer and DevOps engineer building scalable systems with Python, C/C++, and React.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const skillsSection = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, skillsSection, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            setVisibleSections(prevSections => {
              if (prevSections.includes(section)) return prevSections;
              return [...prevSections, section];
            });
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Real-time Arbitrage & ETF Monitor"
        description="A fintech terminal that tracks arbitrage opportunities, ETF price ticks, basis points (BPS), and Z-scores across NSE instruments in real time"
        buttonText="View on GitHub"
        buttonLink="https://github.com/SGSShaurya5497/Arb"
        model={{
          type: 'laptop',
          alt: 'Arb real-time arbitrage monitor dashboard',
          textures: [
            {
              srcSet: `${arbTexture} 1280w, ${arbTextureLarge} 2560w`,
              placeholder: arbTexturePlaceholder,
            },
          ],
        }}
      />
      <Skills
        id="skills"
        sectionRef={skillsSection}
        visible={visibleSections.includes(skillsSection.current)}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
