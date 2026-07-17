import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import products from "../../../data/products.json";

type Product = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  images: string[];
};

const SITE = "https://allrightpack.lovable.app";

export default defineTool({
  name: "get_product",
  title: "Get product",
  description: "Get full details for a single Allright Pack product by its id.",
  inputSchema: {
    id: z.string().min(1).describe("Product id, e.g. 'bubble-wrap-10metre'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const p = (products as Product[]).find((x) => x.id === id);
    if (!p) {
      return { content: [{ type: "text", text: `No product found with id '${id}'.` }], isError: true };
    }
    const product = {
      id: p.id,
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel,
      description: p.description,
      image: `${SITE}${p.image}`,
      images: p.images.map((i) => `${SITE}${i}`),
      url: `${SITE}/#product-${p.id}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: { product },
    };
  },
});
