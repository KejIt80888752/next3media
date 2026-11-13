import { motion } from 'framer-motion';

/*
  The exact "3" mark from the NEXT3 logo, split into its rings (public/ring1..5.png,
  extracted from logo.webp). Rings reveal one after another, outer to inner.
  `showNext` sets a big red "NEXT" into the open gap on the left of the 3, like the logo lockup.
*/
const BASE = './'; // relative: works on github.io/next3media/ and in the prerendered HTML
const rings = ['ring5', 'ring4', 'ring3', 'ring2', 'ring1']; // outer -> inner

const ringVariants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, scale: 0.92 },
  show: (d) => ({
    clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1,
    transition: { duration: 1.2, delay: d, ease: [0.65, 0, 0.35, 1] },
  }),
};

const nextVariants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)', x: 60, opacity: 0 },
  show: (d) => ({
    clipPath: 'inset(0% 0% 0% 0%)', x: 0, opacity: 1,
    transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Arcs({ className = '', delay = 0, dark = false, animateOnView = false, showNext = false }) {
  // the wrapper (never clipped) drives the trigger; children inherit the variant
  const trigger = animateOnView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 } }
    : { initial: 'hidden', animate: 'show' };
  return (
    <motion.div className={`mark3 ${dark ? 'mark3-dark' : ''} ${className}`} aria-hidden="true" {...trigger}>
      {rings.map((r, i) => (
        <motion.img
          key={r}
          src={`${BASE}${r}.png`}
          alt=""
          draggable="false"
          variants={ringVariants}
          custom={delay + i * 0.14}
        />
      ))}
      {showNext && (
        <motion.span className="mark3-next" variants={nextVariants} custom={delay + 0.7}>
          NEXT
        </motion.span>
      )}
    </motion.div>
  );
}
