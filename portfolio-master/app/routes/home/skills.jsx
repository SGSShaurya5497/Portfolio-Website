import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useState, useRef } from 'react';
import styles from './skills.module.css';

const skills = [
  {
    name: 'Python',
    category: 'Language',
    color: '#3776AB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  {
    name: 'React',
    category: 'Frontend',
    color: '#61DAFB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'HTML5',
    category: 'Language',
    color: '#E34F26',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    category: 'Language',
    color: '#1572B6',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    category: 'Language',
    color: '#F7DF1E',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    color: '#009688',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  },
  {
    name: 'Docker',
    category: 'DevOps',
    color: '#2496ED',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  {
    name: 'Redis',
    category: 'Infrastructure',
    color: '#DC382D',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  },
  {
    name: 'Git',
    category: 'Tooling',
    color: '#F05032',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
];

function SkillCard({ name, category, color, icon, visible, index }) {
  const cardRef = useRef();

  const handleMouseMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -10;
    const ry = ((x - cx) / cx) * 10;
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      data-visible={visible}
      style={{
        '--delay': `${index * 60}ms`,
        '--accent': color,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardGlow} />
      <img
        src={icon}
        alt={`${name} logo`}
        className={styles.cardIcon}
        width={52}
        height={52}
        loading="lazy"
      />
      <Text className={styles.cardName} weight="medium">
        {name}
      </Text>
      <span className={styles.cardBadge}>{category}</span>
    </div>
  );
}

export function Skills({ id, sectionRef, visible: sectionVisible }) {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.skills}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={sectionVisible || focused} timeout={0}>
        {({ visible }) => (
          <div className={styles.inner}>
            {/* ── Header ── */}
            <div className={styles.header}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <span className={styles.tagText} data-visible={visible}>
                  Tech stack
                </span>
              </div>
              <Heading
                className={styles.title}
                data-visible={visible}
                level={3}
                as="h2"
                id={titleId}
              >
                Skills &amp; Tools
              </Heading>
              <Text
                className={styles.description}
                data-visible={visible}
                size="l"
                as="p"
              >
                Languages, frameworks, and tools I use to build and ship things.
              </Text>
            </div>

            {/* ── Card grid ── */}
            <div className={styles.grid}>
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  {...skill}
                  visible={visible}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
