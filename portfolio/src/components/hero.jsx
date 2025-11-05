import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-black text-white">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Hey, I'm Vejanand
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-2xl mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        I build advanced full-stack web apps with the MERN stack. This is my
        developer portfolio.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href="#projects"
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          See Projects
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Download Resume
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
