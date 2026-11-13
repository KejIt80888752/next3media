import { motion } from 'framer-motion';

/*
  The exact "3" mark from the NEXT3 logo, split into its rings (public/ring1..5.png,
  extracted from logo.webp). Rings reveal one after another, outer to inner.
*/
const BASE = import.meta.env.BASE_URL;
const rings = ['ring5', 'ring4', 'ring3', 'ring2', 'ring1']; // outer -> inner

const ringVariants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, scale: 0.92 },
  show: (d) => ({
    clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1,
    transition: { duration: 1.2, delay: d, ease: [0.65, 0, 0.35, 1] },
  }),
};

export default function Arcs({ className = '', delay = 0, dark = false, animateOnView = false }) {
  // the wrapper (never clipped) drives the trigger; rings inherit the variant
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
    </motion.div>
  );
}
