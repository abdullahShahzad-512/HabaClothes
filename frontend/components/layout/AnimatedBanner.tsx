"use client";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface AnimatedBannerProps {
    text: string;
    icon?: React.ReactNode;
    variant?: "info" | "warning" | "success" | "promo";
    showMarquee?: boolean;
}

export function AnimatedBanner({
    text,
    icon,
    variant = "info",
    showMarquee = true,
}: AnimatedBannerProps) {
    const variants = {
        info: "bg-gradient-to-r from-clay/10 to-sage/10 border-clay/20",
        warning: "bg-gradient-to-r from-rust/10 to-clay/10 border-rust/20",
        success: "bg-gradient-to-r from-sage/10 to-chalk/10 border-sage/20",
        promo: "bg-gradient-to-r from-rust/20 to-clay/20 border-rust/30",
    };

    const textColors = {
        info: "text-ink",
        warning: "text-rust",
        success: "text-sage",
        promo: "text-rust font-semibold",
    };

    return (
        <motion.div
            className={`relative overflow-hidden border-b ${variants[variant]}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="max-w-screen-xl mx-auto px-6 md:px-12 py-3 md:py-4 flex items-center justify-center gap-3"
                animate={
                    showMarquee
                        ? {
                              x: [0, -1000],
                          }
                        : {}
                }
                transition={
                    showMarquee
                        ? {
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                          }
                        : {}
                }
            >
                {icon && (
                    <motion.div
                        className="flex-shrink-0"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        {icon}
                    </motion.div>
                )}
                <p
                    className={`font-mono text-xs tracking-widest uppercase whitespace-nowrap text-center ${textColors[variant]}`}
                >
                    {text}
                </p>
                {showMarquee && (
                    <p
                        className={`font-mono text-xs tracking-widest uppercase whitespace-nowrap text-center ml-20 ${textColors[variant]}`}
                    >
                        {text}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

interface AnimatedAnnouncementProps {
    title: string;
    message: string;
    onClose?: () => void;
    action?: {
        label: string;
        href: string;
    };
}

export function AnimatedAnnouncement({
    title,
    message,
    onClose,
    action,
}: AnimatedAnnouncementProps) {
    return (
        <motion.div
            className="fixed top-20 left-4 right-4 md:left-auto md:right-6 max-w-md z-40"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
            }}
        >
            <motion.div
                className="bg-chalk border border-bone shadow-xl rounded-lg overflow-hidden"
                animate={{
                    boxShadow: [
                        "0 4px 20px rgba(181, 147, 107, 0.1)",
                        "0 8px 40px rgba(181, 147, 107, 0.2)",
                        "0 4px 20px rgba(181, 147, 107, 0.1)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            >
                <div className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <motion.h3
                            className="font-display text-lg font-medium text-ink"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {title}
                        </motion.h3>
                        {onClose && (
                            <motion.button
                                onClick={onClose}
                                className="text-ink/40 hover:text-ink transition-colors"
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ✕
                            </motion.button>
                        )}
                    </div>

                    {/* Message */}
                    <motion.p
                        className="text-sm text-ink/60 mb-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {message}
                    </motion.p>

                    {/* Action */}
                    {action && (
                        <motion.a
                            href={action.href}
                            className="inline-block px-4 py-2 bg-ink text-chalk font-mono text-xs tracking-widest uppercase rounded hover:bg-rust transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {action.label}
                        </motion.a>
                    )}
                </div>

                {/* Progress bar */}
                <motion.div
                    className="h-1 bg-gradient-to-r from-clay via-sage to-rust"
                    animate={{
                        scaleX: [0, 1],
                    }}
                    transition={{
                        duration: 5,
                    }}
                    style={{
                        originX: 0,
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
