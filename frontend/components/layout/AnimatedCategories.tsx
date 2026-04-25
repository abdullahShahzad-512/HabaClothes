"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryProps {
    name: string;
    href: string;
    label: string;
    gradient: string;
    index: number;
}

const CategoryCard = ({ name, href, label, gradient, index }: CategoryProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.34, 1.56, 0.64, 1],
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -12 }}
        >
            <Link href={href}>
                <motion.div
                    className="relative group overflow-hidden rounded-lg h-56 md:h-64"
                    initial={{ borderRadius: "0px" }}
                    whileHover={{ borderRadius: "12px" }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-bone" />

                    {/* Animated gradient */}
                    <motion.div
                        className="absolute inset-0 opacity-60"
                        style={{
                            background: gradient,
                        }}
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Overlay gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                            x: [-100, 100],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="font-mono text-xs tracking-widest uppercase text-chalk/60 mb-1">
                                {label}
                            </p>
                        </motion.div>
                        <motion.h3
                            className="font-display text-3xl font-light text-chalk"
                            initial={{ y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {name}
                        </motion.h3>
                    </div>

                    {/* Arrow icon */}
                    <motion.div
                        className="absolute top-4 right-4"
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowRight size={20} className="text-chalk" />
                    </motion.div>

                    {/* Decorative corner */}
                    <motion.div
                        className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </Link>
        </motion.div>
    );
};

export function AnimatedCategories() {
    const categories = [
        {
            name: "Collections",
            href: "/products?category=collections",
            label: "Curated for Her",
            gradient: "linear-gradient(135deg, #B5936B 0%, #7A8C72 100%)",
            index: 0,
        },
        {
            name: "Seasonal",
            href: "/products?category=seasonal",
            label: "Latest Trends",
            gradient: "linear-gradient(135deg, #9B4A2A 0%, #B5936B 100%)",
            index: 1,
        },
        {
            name: "Basics",
            href: "/products?category=basics",
            label: "Essentials",
            gradient: "linear-gradient(135deg, #C5CBD8 0%, #7A8C72 100%)",
            index: 2,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section className="py-20 px-6 md:px-12 bg-chalk">
            <div className="max-w-screen-xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="flex items-center justify-between mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Shop by Category
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/products" className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-ink/50 hover:text-ink transition-colors">
                            All Products <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Categories grid */}
                <motion.div
                    className="grid md:grid-cols-3 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {categories.map((cat) => (
                        <CategoryCard key={cat.name} {...cat} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
