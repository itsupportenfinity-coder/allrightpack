import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import products from "../../../data/products.json";

type Product = { category: string; categoryLabel: string };

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description: "List all packaging product categories available at Allright Pack with a count of products in each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    for (const p of products as Product[]) {
      const entry = map.get(p.category) ?? { id: p.category, label: p.categoryLabel, count: 0 };
      entry.count += 1;
      map.set(p.category, entry);
    }
    const categories = Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
    return {
      content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
      structuredContent: { categories },
    };
  },
});
