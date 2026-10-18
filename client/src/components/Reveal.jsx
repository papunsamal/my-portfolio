import { motion, useReducedMotion } from "framer-motion";

function Reveal({ children, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
