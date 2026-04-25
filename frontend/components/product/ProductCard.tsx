"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import clsx from "clsx";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    className?: string;
    index?: number;
}

const getFallbackProductImage = (name: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect width="100%" height="100%" fill="#E8E2D9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#0D0D0D" font-family="Arial, sans-serif" font-size="20">${name}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
    const [wishlist, setWishlist] = useState(false);
    const [added, setAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { addItem } = useCartStore();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
        hover: {
            y: -8,
            transition: { duration: 0.3 },
        },
    };

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.08, transition: { duration: 0.4 } },
    };

    const buttonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    };

    const heartVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className={clsx("group relative", className)}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block">
                {/* Image container with 3D effect */}
                <div className="relative aspect-[3/4] bg-bone overflow-hidden mb-4 rounded-sm shadow-md">
                    <motion.div
                        className="w-full h-full"
                        variants={imageVariants}
                        initial="rest"
                        animate={isHovered ? "hover" : "rest"}
                    >
                        <Image
                            src={product.imageUrl || getFallbackProductImage(product.name)}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Gradient overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Quick add button with animation */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0"
                        variants={buttonVariants}
                        initial="hidden"
                        animate={isHovered ? "visible" : "hidden"}
                    >
                        <button
                            onClick={handleQuickAdd}
                            className={clsx(
                                "w-full py-3 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase transition-all duration-200",
                                added
                                    ? "bg-sage text-chalk"
                                    : "bg-ink text-chalk hover:bg-rust"
                            )}
                        >
                            <motion.div
                                animate={added ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <ShoppingBag size={14} />
                            </motion.div>
                            {added ? "Added!" : "Quick Add"}
                        </button>
                    </motion.div>

                    {/* Wishlist button with animation */}
                    <motion.button
                        onClick={(e) => { e.preventDefault(); setWishlist(!wishlist); }}
                        className="absolute top-3 right-3 w-8 h-8 bg-chalk/80 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-chalk transition-colors"
                        variants={heartVariants}
                        initial="hidden"
                        animate={isHovered ? "visible" : "hidden"}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={wishlist ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <Heart
                                size={14}
                                className={wishlist ? "fill-rust text-rust" : "text-ink"}
                            />
                        </motion.div>
                    </motion.button>

                    {/* Stock badge with pulse */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {product.stock <= 5 && product.stock > 0 && (
                            <motion.span
                                className="absolute top-3 left-3 bg-rust text-chalk font-mono text-[10px] tracking-widest px-2 py-1 uppercase rounded"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Only {product.stock} left
                            </motion.span>
                        )}
                        {product.stock === 0 && (
                            <span className="absolute top-3 left-3 bg-ink/60 text-chalk font-mono text-[10px] tracking-widest px-2 py-1 uppercase rounded">
                                Sold Out
                            </span>
                        )}
                    </motion.div>
                </div>

                {/* Info section with staggered animation */}
                <motion.div
                    className="space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <p className="font-mono text-[10px] tracking-widest uppercase text-ink/40">{product.category}</p>
                    <h3 className="font-body text-sm font-medium text-ink leading-snug hover:text-clay transition-colors">{product.name}</h3>
                    <motion.p
                        className="font-mono text-sm text-clay font-medium"
                        animate={added ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        PKR {product.price.toFixed(2)}
                    </motion.p>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-[3/4] skeleton mb-4" />
            <div className="space-y-2">
                <div className="h-3 skeleton w-16" />
                <div className="h-4 skeleton w-3/4" />
                <div className="h-4 skeleton w-20" />
            </div>
        </div>
    );
}