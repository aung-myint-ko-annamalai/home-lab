"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { NewProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { createProduct } from "@/actions/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const defaultForm: NewProduct = {
  name: "",
  slug: "",
  description: "",
  price: "",
  stock: 0,
  sku: "",
  status: "draft",
  isFeatured: false,
  categoryId: null,
};

export function AddProductDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewProduct>(defaultForm);
  const { creating } = useAppSelector((s) => s.products);

  const handleChange = (
    field: keyof NewProduct,
    value: string | number | boolean | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }));
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    mutation.mutate(form);
    setForm(defaultForm);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Add new product"
      >
        <Plus className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Product name"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="product-slug"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Price & Stock row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                value={form.stock}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value) || 0)
                }
                required
              />
            </div>
          </div>

          {/* SKU */}
          <div className="space-y-1.5">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              placeholder="SKU-001"
              value={form.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(val: string) => handleChange("status", val)}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category ID */}
          <div className="space-y-1.5">
            <Label htmlFor="categoryId">Category ID</Label>
            <Input
              id="categoryId"
              type="number"
              min="1"
              placeholder="Category ID (optional)"
              value={form.categoryId ?? ""}
              onChange={(e) =>
                handleChange(
                  "categoryId",
                  e.target.value ? parseInt(e.target.value) : null,
                )
              }
            />
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
            <Label htmlFor="isFeatured" className="text-sm cursor-pointer">
              Featured Product
            </Label>
            <Switch
              id="isFeatured"
              checked={form.isFeatured}
              onCheckedChange={(checked) => handleChange("isFeatured", checked)}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose className="inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              Cancel
            </DialogClose>
            <Button type="submit" disabled={creating}>
              {creating ? "Creating…" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
