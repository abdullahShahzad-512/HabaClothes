"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    image?: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Anderson",
        role: "Fashion Enthusiast",
        content: "The quality and attention to detail is unmatched. I've invested in pieces from HabaClothes that I know will last for years.",
        rating: 5,
    },
    {
        name: "Maya Patel",
        role: "Designer",
        content: "Finally a brand that understands minimalism isn't boring — it's intentional and beautiful.",
        rating: 5,
    },
    {
        name: "James Chen",
        role: "Creative Director",
        content: "Every piece tells a story. The curation is impeccable and the quality is exceptional.",
        rating: 5,
    },
    {
        name: "Emma Williams",
        role: "Style Curator",
        content: "HabaClothes has become my go-to for timeless pieces that elevate any wardrobe.",
        rating: 5,
    },
];

interface AnimatedTestimonialsProps {
    title?: string;
    description?: string;
}

export function AnimatedTestimonials({
    title = "Loved by Our Community",
    description = "See what our customers are saying about their HabaClothes experience",
}: AnimatedTestimonialsProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    };

    return (
        <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-chalk to-bone overflow-hidden">
            {/* Background decorative elements */}
            <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 bg-clay/5 rounded-full blur-3xl"
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

            <div className="relative z-10 max-w-screen-xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="font-mono text-xs tracking-[0.3em] uppercase text-clay mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        ✨ TESTIMONIALS
                    </motion.p>

                    <motion.h2
                        className="section-title mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                        viewport={{ once: true }}
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        className="text-ink/60 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        {description}
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            {/* Card background with glass effect */}
                            <motion.div
                                className="absolute inset-0 bg-white/40 backdrop-blur-md border border-white/60 rounded-lg"
                                animate={{
                                    boxShadow: [
                                        "0 4px 15px rgba(0,0,0,0.05)",
                                        "0 8px 30px rgba(181, 147, 107, 0.1)",
                                        "0 4px 15px rgba(0,0,0,0.05)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            />

                            {/* Card content */}
                            <div className="relative z-10 p-6 space-y-4">
                                {/* Rating stars */}
                                <div className="flex gap-1">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: i * 0.1,
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Star
                                                size={16}
                                                className="fill-clay text-clay"
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Quote */}
                                <motion.p
                                    className="font-body text-sm text-ink/70 leading-relaxed italic"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    "{testimonial.content}"
                                </motion.p>

                                {/* Author */}
                                <motion.div
                                    className="space-y-1 pt-4 border-t border-white/20"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <p className="font-display text-sm font-medium text-ink">
                                        {testimonial.name}
                                    </p>
                                    <p className="font-mono text-xs text-ink/40 tracking-widest uppercase">
                                        {testimonial.role}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Hover glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-clay/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
