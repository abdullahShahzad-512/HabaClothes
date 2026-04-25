"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function AnimatedHero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    };

    const floatVariants = {
        animate: {
            y: [-20, 0, -20],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section className="relative min-h-screen flex items-end pt-24 md:pt-28 pb-10 md:pb-14 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-ink via-ink to-ink">
            {/* Background texture animation */}
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F2EC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "60px 60px"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

            {/* Animated background elements */}
            <motion.div
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-rust/5 blur-3xl"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-sage/5 blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 max-w-screen-xl mx-auto w-full">
                <motion.div
                    className="max-w-3xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Tag */}
                    <motion.p
                        className="font-mono text-xs tracking-[0.3em] uppercase text-clay mb-6"
                        variants={itemVariants}
                    >
                        ✨ Spring / Summer 2025
                    </motion.p>

                    {/* Main heading with 3D effect */}
                    <motion.div
                        className="mb-8 overflow-hidden"
                        variants={itemVariants}
                    >
                        <motion.h1
                            className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-chalk leading-none"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            Dress with
                            <motion.br />
                            <motion.em
                                className="not-italic text-clay block"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%"],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.2,
                                }}
                            >
                                intention.
                            </motion.em>
                        </motion.h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="font-body text-chalk/60 text-lg font-light max-w-md mb-10 leading-relaxed"
                        variants={itemVariants}
                    >
                        Garments crafted for those who understand that true style lies in the details — and the silence between them.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4"
                        variants={itemVariants}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/products" className="btn-primary">
                                Explore Collection
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/products?category=new-arrivals"
                                className="btn-outline border-chalk text-chalk hover:bg-chalk hover:text-ink"
                            >
                                New Arrivals
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator with animation */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-chalk text-xs font-mono tracking-widest uppercase opacity-60">Scroll</span>
                    <ArrowRight size={16} className="text-chalk opacity-60 rotate-90" />
                </div>
            </motion.div>
        </section>
    );
}
