import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

// Status enum (draft, active, archived)
export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

// Categories table (for foreign key relations)
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),

    // Numeric for accurate financial calculations
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),

    stock: integer("stock").default(0).notNull(),
    sku: text("sku").unique(),

    status: productStatusEnum("status").default("draft").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),

    // Foreign key linking to categories
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("idx_products_category").on(table.categoryId),
    index("idx_products_status").on(table.status),
  ],
);

// Define relations for Drizzle relational queries (db.query)
export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Inferred TypeScript types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
