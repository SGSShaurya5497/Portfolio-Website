import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="29"
      viewBox="0 0 48 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          {/* S */}
          <path d="M2 7 C2 3 5 1 9 1 C13 1 16 3 16 6 C16 9 13 10.5 9 11.5 C5 12.5 2 14 2 17.5 C2 21 5 23 9 23 C13 23 16 21 16 18 M2 7 L2 7" />
          {/* C */}
          <path d="M34 7 C31 3 27 1 23 1 C18 1 19 4 19 12 C19 20 18 25 23 25 C27 25 31 23 34 19" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
