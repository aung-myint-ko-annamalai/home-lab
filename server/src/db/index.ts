import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { DATABASE_URL } from "../config/env";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
