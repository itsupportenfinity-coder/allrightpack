import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import products from "../../../data/products.json";

type Product = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
};

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List Allright Pack packaging products. Optionally filter by category id (see list_categories) or a text query matching the product name.",
  inputSchema: {
    category: z.string().optional().describe("Category id to filter by, e.g. 'stretch-film'."),
    query: z.string().optional().describe("Case-insensitive substring match on product name."),
    limit: z.number().int().positive().optional().describe("Maximum number of products to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, query, limit }) => {
    const q = query?.trim().toLowerCase();
    let results = (products as Product[]).filter((p) => {
      if (category && p.category !== category) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    const total = results.length;
    results = results.slice(0, limit ?? 50);
    const items = results.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify({ total, returned: items.length, items }, null, 2) }],
      structuredContent: { total, returned: items.length, items },
    };
  },
});
