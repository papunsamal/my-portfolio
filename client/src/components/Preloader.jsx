import { motion } from 'framer-motion';

function Preloader() {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="preloader-logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        &lt;Papun<span>/</span>&gt;
      </motion.h1>
      <div className="preloader-bar">
        <motion.div
          className="preloader-fill"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

export default Preloader;
