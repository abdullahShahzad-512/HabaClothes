"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedHero } from "@/components/layout/AnimatedHero";
import { AnimatedCategories } from "@/components/layout/AnimatedCategories";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Animated Hero Section */}
            <AnimatedHero />

            {/* Animated Categories Section */}
            <AnimatedCategories />

            {/* Editorial Strip with 3D Effects */}
            <section className="relative py-20 px-6 md:px-12 bg-ink text-chalk overflow-hidden">
                {/* Background animated elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-40 right-0 w-96 h-96 bg-rust/10 rounded-full blur-3xl"
                        animate={{
                            y: [-50, 50, -50],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-40 left-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl"
                        animate={{
                            y: [50, -50, 50],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-screen-xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                            viewport={{ once: true }}
                        >
                            <motion.p
                                className="font-mono text-xs tracking-[0.3em] uppercase text-clay mb-6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                ✨ Our Philosophy
                            </motion.p>
                            <motion.h2
                                className="font-display text-5xl md:text-6xl font-light leading-tight mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                                viewport={{ once: true }}
                            >
                                Fewer pieces,<br />
                                <motion.em
                                    className="not-italic text-clay"
                                    animate={{
                                        textShadow: [
                                            "0 0 0px rgba(181, 147, 107, 0)",
                                            "0 0 20px rgba(181, 147, 107, 0.5)",
                                            "0 0 0px rgba(181, 147, 107, 0)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    worn more.
                                </motion.em>
                            </motion.h2>
                            <motion.p
                                className="font-body text-chalk/50 leading-relaxed mb-8 max-w-md text-lg"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                HabaClothes champions the slow wardrobe. Each piece is designed to outlast trends and grow with your story — made from materials that age beautifully.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/products" className="btn-outline border-chalk text-chalk hover:bg-chalk hover:text-ink inline-block">
                                    Discover More
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Animated 3D Card */}
                        <motion.div
                            className="relative h-80 md:h-96 perspective"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                            viewport={{ once: true }}
                            whileHover={{ rotateY: 5, rotateX: -5 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-chalk/10 to-clay/10 border border-chalk/20 rounded-lg flex items-center justify-center overflow-hidden"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(181, 147, 107, 0.1)",
                                        "0 0 40px rgba(181, 147, 107, 0.3)",
                                        "0 0 20px rgba(181, 147, 107, 0.1)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            >
                                {/* Video Thumbnail Image */}
                                <video
                                    src="/videos/philosophy-video.mp4"
                                    className="object-cover w-full h-full rounded-lg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section with Parallax */}
            <section className="relative py-20 px-6 md:px-12 bg-chalk overflow-hidden">
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="absolute top-0 right-0 w-96 h-96 bg-clay/5 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>

                <div className="relative z-10 max-w-screen-xl mx-auto text-center">
                    <motion.p
                        className="font-mono text-xs tracking-[0.3em] uppercase text-clay mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        ✨ READY TO EXPLORE?
                    </motion.p>

                    <motion.h2
                        className="font-display text-4xl md:text-6xl font-light text-ink mb-8 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                        viewport={{ once: true }}
                    >
                        Discover Your Perfect Piece
                    </motion.h2>

                    <motion.p
                        className="font-body text-ink/60 text-lg max-w-2xl mx-auto mb-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Browse our curated collections and find pieces that speak to your style.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/products" className="btn-primary">
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-chalk border-t border-bone px-6 md:px-12 overflow-hidden">
                {/* Decorative animated wave background */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-16 opacity-8 pointer-events-none"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(181, 147, 107, 0.15) 50%, transparent 100%)",
                        maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, transparent 0%, black 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, transparent 0%, black 100%)",
                    }}
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                    }}
                />

                <div className="relative z-10 max-w-screen-xl mx-auto py-16">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, staggerChildren: 0.1 }}
                        viewport={{ once: true }}
                    >
                        {[
                            { title: "Shop", links: ["Collections", "Seasonal", "Basics", "Accessories", "New Arrivals"] },
                            { title: "Help", links: ["Sizing Guide", "Shipping & Returns", "FAQ", "Contact"] },
                            { title: "Company", links: ["About", "Sustainability", "Press", "Careers"] },
                            { title: "Follow", links: ["Instagram", "Pinterest", "TikTok", "Newsletter"] },
                        ].map((col) => (
                            <motion.div
                                key={col.title}
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="font-mono text-xs tracking-widest uppercase text-ink/50 font-medium">{col.title}</h4>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <motion.a
                                                href="#"
                                                className="font-body text-sm text-ink/60 hover:text-clay transition-colors duration-200 inline-block relative group"
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {link}
                                                <motion.span
                                                    className="absolute bottom-0 left-0 h-px bg-clay"
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: "100%" }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-bone to-transparent mb-8"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    />

                    {/* Bottom section */}
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <motion.p
                            className="font-display text-lg md:text-xl font-light tracking-widest text-ink/40"
                            animate={{
                                letterSpacing: ["0.2em", "0.3em", "0.2em"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                        >
                            HABA
                        </motion.p>
                        <p className="font-mono text-xs text-ink/40 text-center md:text-right">© 2025 HabaClothes. All rights reserved.</p>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}
