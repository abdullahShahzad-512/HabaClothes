"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Package } from "lucide-react";
import { ordersApi } from "@/lib/api";

type OrderLike = Record<string, unknown>;

type OrderItemLike = Record<string, unknown>;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(value);

const parseDate = (value: unknown): Date | null => {
  if (!value || (typeof value !== "string" && typeof value !== "number")) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getOrderTotal = (order: OrderLike): number => {
  const raw =
    (order.total as number | string | undefined) ??
    (order.totalAmount as number | string | undefined) ??
    (order.grandTotal as number | string | undefined) ??
    (order.amount as number | string | undefined);
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const parsed = Number(raw.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const getOrderStatus = (order: OrderLike): string =>
  ((order.status as string | undefined) || (order.state as string | undefined) || "Unknown").toString();

const extractOrder = (value: unknown): OrderLike | null => {
  if (!value) return null;
  if (typeof value === "object") {
    const v = value as { data?: unknown };
    if (v.data && typeof v.data === "object") return v.data as OrderLike;
    return value as OrderLike;
  }
  return null;
};

const extractItems = (order: OrderLike | null): OrderItemLike[] => {
  if (!order) return [];
  const items =
    (order.items as OrderItemLike[] | undefined) ||
    (order.orderItems as OrderItemLike[] | undefined) ||
    (order.lines as OrderItemLike[] | undefined);
  return Array.isArray(items) ? items : [];
};

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderLike | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ordersApi.getById(Number(id));
        const resolved = extractOrder(response);
        setOrder(resolved);
      } catch {
        setError("Failed to load order details.");
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const createdAt = useMemo(() => parseDate(order?.createdAt), [order]);
  const items = useMemo(() => extractItems(order), [order]);

  const customer = order?.user as Record<string, unknown> | undefined;
  const customerName = [customer?.firstName, customer?.lastName].filter(Boolean).join(" ") || "Guest";
  const customerEmail = (customer?.email as string | undefined) || "";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-ink/40 hover:text-ink transition-colors"
          >
            <ChevronLeft size={12} />
            Back to Orders
          </Link>
          <h1 className="font-display text-4xl font-light mt-3">Order #{id}</h1>
          <p className="font-mono text-xs text-ink/40 mt-1 tracking-widest">Detailed view</p>
        </div>
        {order && (
          <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-bone bg-chalk">
            {getOrderStatus(order)}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-6 border border-rust/30 bg-rust/5 px-4 py-3 font-mono text-xs text-rust">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border border-bone bg-chalk px-6 py-8 font-mono text-xs text-ink/40">
          Loading order...
        </div>
      ) : !order ? (
        <div className="border border-bone bg-chalk px-6 py-8 font-mono text-xs text-ink/40">
          Order not found.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-chalk border border-bone">
            <div className="px-6 py-4 border-b border-bone">
              <h2 className="font-mono text-xs tracking-widest uppercase">Items</h2>
            </div>
            <div className="divide-y divide-bone">
              {items.length === 0 ? (
                <div className="px-6 py-8 font-mono text-xs text-ink/40">No items found.</div>
              ) : (
                items.map((item, index) => {
                  const product = item.product as Record<string, unknown> | undefined;
                  const name = (product?.name as string | undefined) || "Unknown item";
                  const quantity = (item.quantity as number | undefined) || 0;
                  const unitPrice = (item.unitPrice as number | undefined) || 0;
                  const size = item.size as string | undefined;
                  const color = item.color as string | undefined;
                  return (
                    <div key={`${name}-${index}`} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-body text-sm">{name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                          {size ? `Size ${size}` : ""}
                          {size && color ? " / " : ""}
                          {color ? `Color ${color}` : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-ink/60">Qty {quantity}</p>
                        <p className="font-mono text-xs">{formatCurrency(unitPrice)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <aside className="bg-chalk border border-bone h-fit">
            <div className="px-6 py-4 border-b border-bone">
              <h2 className="font-mono text-xs tracking-widest uppercase">Summary</h2>
            </div>
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Customer</span>
                <span className="font-body text-sm text-ink/80">{customerName}</span>
              </div>
              {customerEmail && (
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink/40">Email</span>
                  <span className="font-mono text-xs text-ink/70">{customerEmail}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Placed</span>
                <span className="font-mono text-xs text-ink/70">
                  {createdAt ? createdAt.toLocaleString() : "N/A"}
                </span>
              </div>
              <div className="border-t border-bone pt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Total</span>
                <span className="font-display text-2xl">{formatCurrency(getOrderTotal(order))}</span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-bone flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/40">
              <Package size={12} />
              {items.length} items
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
