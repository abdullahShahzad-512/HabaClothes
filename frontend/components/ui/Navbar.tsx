"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Collections", "Seasonal", "Basics", "Accessories", "New Arrivals"];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const { toggleCart, itemCount } = useCartStore();
    const { isAuthenticated, user, logout } = useAuthStore();
    const count = itemCount();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const headerClass = scrolled
        ? "bg-chalk/95 backdrop-blur-sm shadow-md"
        : "bg-gradient-to-b from-ink/70 via-ink/30 to-transparent";
    const textClass = scrolled ? "text-ink" : "text-chalk";
    const mutedTextClass = scrolled ? "text-ink/70 hover:text-ink" : "text-chalk/80 hover:text-chalk";

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 ${headerClass}`}
                animate={{
                    boxShadow: scrolled
                        ? "0 4px 20px rgba(0,0,0,0.1)"
                        : "0 0 0px rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Animated Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/"
                                className={`font-display text-2xl md:text-3xl font-light tracking-[0.15em] transition-colors duration-300 ${textClass}`}
                            >
                                <motion.span
                                    animate={{
                                        letterSpacing: ["0.15em", "0.2em", "0.15em"],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    HABA
                                </motion.span>
                            </Link>
                        </motion.div>

                        {/* Desktop Nav with hover effects */}
                        <nav className="hidden md:flex items-center gap-8">
                            {categories.map((cat, index) => (
                                <motion.div
                                    key={cat}
                                    onHoverStart={() => setHoveredCategory(cat)}
                                    onHoverEnd={() => setHoveredCategory(null)}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.4,
                                    }}
                                >
                                    <Link
                                        href={`/products?category=${cat.toLowerCase().replace(" ", "-")}`}
                                        className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative ${mutedTextClass}`}
                                    >
                                        {cat}
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-clay to-transparent"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: hoveredCategory === cat ? "100%" : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-4 md:gap-6">
                            {isAuthenticated ? (
                                <div className="hidden md:flex items-center gap-1 group relative">
                                    <motion.button
                                        className={`font-mono text-xs tracking-widest uppercase flex items-center gap-1 transition-colors ${mutedTextClass}`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <User size={14} />
                                        {user?.firstName}
                                        <motion.div
                                            animate={{ rotate: 0 }}
                                            whileHover={{ rotate: 180 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={12} />
                                        </motion.div>
                                    </motion.button>
                                    <motion.div
                                        className="absolute top-full right-0 mt-2 bg-chalk border border-bone shadow-lg min-w-36 overflow-hidden rounded-md"
                                        initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                                        whileInView={{ opacity: 0, y: -10 }}
                                        whileHover={{ opacity: 1, y: 0, scaleY: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {user?.role === "Admin" && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-3 font-mono text-xs tracking-widest uppercase hover:bg-bone transition-colors"
                                            >
                                                Admin
                                            </Link>
                                        )}
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-3 font-mono text-xs tracking-widest uppercase hover:bg-bone transition-colors"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-3 font-mono text-xs tracking-widest uppercase hover:bg-bone text-rust transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </motion.div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <Link
                                        href="/login"
                                        className={`hidden md:block font-mono text-xs tracking-widest uppercase transition-colors ${mutedTextClass}`}
                                    >
                                        Sign In
                                    </Link>
                                </motion.div>
                            )}

                            {/* Animated Cart Button */}
                            <motion.button
                                onClick={toggleCart}
                                className={`relative p-1 transition-colors duration-200 ${textClass}`}
                                aria-label="Open cart"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                <AnimatePresence>
                                    {count > 0 && (
                                        <motion.span
                                            suppressHydrationWarning
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-rust text-chalk text-[10px] font-mono flex items-center justify-center rounded-full"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 15,
                                            }}
                                        >
                                            {count}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Mobile menu toggle */}
                            <motion.button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className={`md:hidden ${textClass}`}
                                aria-label="Toggle menu"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <AnimatePresence mode="wait">
                                    {mobileOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X size={20} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu size={20} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Animated Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            className="md:hidden bg-chalk border-t border-bone px-6 py-6"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.nav className="flex flex-col gap-6">
                                {categories.map((cat) => (
                                    <motion.div key={cat} variants={mobileItemVariants}>
                                        <Link
                                            href={`/products?category=${cat.toLowerCase().replace(" ", "-")}`}
                                            onClick={() => setMobileOpen(false)}
                                            className="font-mono text-sm tracking-widest uppercase text-ink/70 hover:text-ink transition-colors"
                                        >
                                            {cat}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.hr
                                    className="border-bone"
                                    variants={mobileItemVariants}
                                />
                                {isAuthenticated ? (
                                    <>
                                        {user?.role === "Admin" && (
                                            <motion.div variants={mobileItemVariants}>
                                                <Link
                                                    href="/admin"
                                                    onClick={() => setMobileOpen(false)}
                                                    className="font-mono text-sm tracking-widest uppercase"
                                                >
                                                    Admin Panel
                                                </Link>
                                            </motion.div>
                                        )}
                                        <motion.div variants={mobileItemVariants}>
                                            <Link
                                                href="/profile"
                                                onClick={() => setMobileOpen(false)}
                                                className="font-mono text-sm tracking-widest uppercase"
                                            >
                                                Profile
                                            </Link>
                                        </motion.div>
                                        <motion.div variants={mobileItemVariants}>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setMobileOpen(false);
                                                }}
                                                className="text-left font-mono text-sm tracking-widest uppercase text-rust"
                                            >
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div variants={mobileItemVariants}>
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileOpen(false)}
                                            className="font-mono text-sm tracking-widest uppercase"
                                        >
                                            Sign In
                                        </Link>
                                    </motion.div>
                                )}
                            </motion.nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}