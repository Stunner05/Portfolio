"use client";
import React from "react";
import { motion, useInView } from "framer-motion";

type Metric = {
  id: number;
  title: string;
  value: string;
  label: string;
  description: string;
};

const metrics: Metric[] = [
  {
    id: 1,
    title: "Experience",
    value: "3+",
    label: "Years of Experience",
    description: "Dedicated to Full Stack Development",
  },
  {
    id: 2,
    title: "Projects",
    value: "50+",
    label: "Projects Completed",
    description: "From small applications to complex web platforms",
  },
  {
    id: 3,
    title: "Code Quality",
    value: "99%",
    label: "Code Quality",
    description: "Committed to writing clean, maintainable, and efficient code",
  },
  {
    id: 4,
    title: "Commits",
    value: "50+",
    label: "Commits to GitHub",
    description: "Active contributor to open-source and personal projects",
  },
];

const KeyMetrics = () => {
  const ref = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="container mx-auto px-4 py-32 text-white"
    >
      <motion.h2 className="text-4xl font-bold mb-10 text-purple-300">
        KEY METRICS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            className="flex flex-col"
          >
            <motion.h3
              className="text-purple-400 mb-2 font-bold text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.1, type: "spring" }}
            >
              {metric.value}
            </motion.h3>

            <motion.p
              className="text-gray-300 text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            >
              {metric.label}
            </motion.p>

            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
            >
              {metric.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default KeyMetrics;
