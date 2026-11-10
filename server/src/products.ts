import { Request, Response, Router } from "express";
import { db } from "./db/index";
import { categories, products } from "./db/schema";

const router = Router();

router.get("/products", async (_req: Request, res: Response) => {
  try {
    const allProducts = await db.query.products.findMany({
      with: {
        category: true,
      },
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/products", async (req: Request, res: Response) => {
  const {
    name,
    slug,
    description,
    price,
    stock,
    sku,
    status,
    isFeatured,
    categoryId,
  } = req.body;
  try {
    const newProduct = await db
      .insert(products)
      .values({
        name,
        slug,
        description,
        price,
        stock,
        sku,
        status,
        isFeatured,
        categoryId,
      })
      .returning();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/categories", async (req: Request, res: Response) => {
  try {
    const allCategories = await db.select().from(categories);
    res.status(200).json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/categories", async (req: Request, res: Response) => {
  const { name, slug } = req.body;
  try {
    const newCategory = await db
      .insert(categories)
      .values({
        name,
        slug,
      })
      .returning();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
