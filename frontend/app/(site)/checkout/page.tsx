"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { ordersApi } from "@/lib/api";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(value);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { hasHydrated, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const totalPrice = total();
  const itemsCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      };
      const response = await ordersApi.create(payload);
      const orderId = response?.id || response?.data?.id || null;
      clearCart();
      setSuccessId(orderId ? String(orderId) : "");
    } catch {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen pt-20 px-6 md:px-12">
        <div className="max-w-screen-lg mx-auto py-12">
          <div className="h-8 w-52 skeleton mb-6" />
          <div className="h-32 w-full skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 pb-16">
      <div className="max-w-screen-lg mx-auto py-8">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-widest uppercase text-ink/40 mb-2">Checkout</p>
          <h1 className="font-display text-5xl font-light">Review your order</h1>
        </div>

        {error && (
          <div className="mb-6 border border-rust/30 bg-rust/5 px-4 py-3 font-mono text-xs text-rust">
            {error}
          </div>
        )}

        {successId !== null && (
          <div className="mb-6 border border-sage/30 bg-sage/10 px-4 py-3 font-mono text-xs text-sage">
            Order placed successfully {successId ? `(#${successId})` : ""}.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-chalk/70 border border-chalk/80">
            <div className="px-6 py-4 border-b border-bone">
              <h2 className="font-mono text-xs tracking-widest uppercase">Items</h2>
            </div>
            <div className="divide-y divide-bone">
              {items.length === 0 ? (
                <div className="px-6 py-8 font-mono text-xs text-ink/40">Your cart is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="px-6 py-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body text-sm">{item.product.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                        {item.size ? `Size ${item.size}` : ""}
                        {item.size && item.color ? " · " : ""}
                        {item.color ? `Color ${item.color}` : ""}
                      </p>
                      <p className="font-mono text-xs text-ink/50 mt-1">Qty {item.quantity}</p>
                    </div>
                    <div className="font-mono text-xs text-ink/70">
                      {formatCurrency(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="bg-chalk/70 border border-chalk/80 h-fit">
            <div className="px-6 py-4 border-b border-bone">
              <h2 className="font-mono text-xs tracking-widest uppercase">Summary</h2>
            </div>
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Items</span>
                <span className="font-mono text-xs text-ink/70">{itemsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Subtotal</span>
                <span className="font-mono text-xs text-ink/70">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="border-t border-bone pt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Total</span>
                <span className="font-display text-2xl">{formatCurrency(totalPrice)}</span>
              </div>

              {!isAuthenticated && (
                <div className="border border-bone/60 bg-bone/40 px-3 py-2 font-mono text-xs text-ink/50">
                  Sign in to place your order.
                </div>
              )}

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading || items.length === 0}
                className="btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingBag size={14} />}
                {loading ? "Placing order..." : "Place order"}
              </button>
              <Link href="/products" className="btn-ghost w-full text-center block">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
