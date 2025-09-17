// components/PageWrapper.jsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0.2, y: 10 },
  animate: { opacity: 1, y: 0,transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0.7, y: -10, scaleX:1.1,transition: { duration: 0.3, ease: "easeIn" } },
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
