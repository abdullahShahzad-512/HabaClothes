"use client";
import Link from "next/link";
import Image from "next/image";
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
        <section className="relative min-h-screen flex items-center pt-24 md:pt-0 pb-10 md:pb-0 overflow-hidden bg-gradient-to-br from-ink via-ink to-ink">
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

            {/* Main content grid */}
            <div className="relative z-10 w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                    {/* Left side - Text content */}
                    <div className="flex items-center px-6 md:px-12 py-20 md:py-0">
                        <motion.div
                            className="max-w-2xl"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Main heading with 3D effect */}
                            <motion.div
                                className="mb-8 overflow-hidden"
                                variants={itemVariants}
                            >
                                <motion.h1
                                    className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-chalk leading-none"
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
                                        intention
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
                                    <Link href="/products" className="btn-primary ">
                                        Explore Collection
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right side - Image */}
                    <motion.div
                        className="relative hidden md:block h-full min-h-screen"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Image
                            src="/images/hero-family.jpg"
                            alt="Dress with intention - HabaClothes family collection"
                            fill
                            className="object-cover w-full h-full"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
