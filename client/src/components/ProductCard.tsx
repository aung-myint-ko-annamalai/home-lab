"use client";

import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const statusColor: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    draft: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    archived: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  };

  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-foreground/10">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-foreground">
              {product.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {product.sku || "No SKU"}
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={`shrink-0 text-[10px] font-medium ${statusColor[product.status] || ""}`}
        >
          {product.status}
        </Badge>
      </div>

      {/* Description */}
      {product.description && (
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}

      {/* Details */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-semibold text-foreground">
          ${Number(product.price).toFixed(2)}
        </span>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>Stock: {product.stock}</span>
          {product.isFeatured && (
            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Category */}
      {product.category && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-[10px] text-muted-foreground">
            Category: {product.category.name}
          </span>
        </div>
      )}
    </div>
  );
}
