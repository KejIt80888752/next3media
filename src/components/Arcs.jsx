import { motion } from 'framer-motion';

/* Animated concentric "3" built from red stroke arcs — echoes the NEXT3 logo mark. */
const radii = [62, 98, 134, 170];
const CX = 230;
const CY1 = 190;
const CY2 = 550; // CY2 - CY1 = 2 * max radius so bowls meet at the waist

const pt = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)].map((n) => n.toFixed(2)).join(' ');
};

function threePath(r) {
  // upper bowl: from left (200°) clockwise over the top to the bottom (90°)
  const upper = `M ${pt(CX, CY1, r, 200)} A ${r} ${r} 0 1 1 ${pt(CX, CY1, r, 90)}`;
  // lower bowl: from its top (270°) clockwise round to the left (160°)
  const lower = `M ${pt(CX, CY2, r, 270)} A ${r} ${r} 0 1 1 ${pt(CX, CY2, r, 160)}`;
  return upper + ' ' + lower;
}

export default function Arcs({ className = '', delay = 0, stroke = 20 }) {
  return (
    <svg className={className} viewBox="0 0 440 760" fill="none" aria-hidden="true">
      {radii.map((r, i) => (
        <motion.path
          key={r}
          d={threePath(r)}
          stroke="#e50914"
          strokeWidth={stroke}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: delay + (radii.length - i) * 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}
