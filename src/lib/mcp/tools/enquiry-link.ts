import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import products from "../../../data/products.json";

type Product = { id: string; name: string };

const WHATSAPP = "97433445566"; // Allright Pack sales WhatsApp

export default defineTool({
  name: "build_enquiry_link",
  title: "Build WhatsApp enquiry link",
  description:
    "Build a WhatsApp enquiry link for one or more Allright Pack products with quantities. Use this to help a customer contact sales.",
  inputSchema: {
    items: z
      .array(
        z.object({
          id: z.string().describe("Product id"),
          quantity: z.number().int().positive().describe("Quantity to enquire about"),
        }),
      )
      .min(1)
      .describe("List of products and quantities to enquire about."),
    note: z.string().optional().describe("Optional extra note from the customer."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: ({ items, note }) => {
    const lines: string[] = ["Hello Allright Pack, I would like to enquire about:"];
    const unknown: string[] = [];
    for (const it of items) {
      const p = (products as Product[]).find((x) => x.id === it.id);
      if (!p) {
        unknown.push(it.id);
        continue;
      }
      lines.push(`- ${p.name} x ${it.quantity}`);
    }
    if (note) lines.push(`Note: ${note}`);
    const message = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    return {
      content: [
        {
          type: "text",
          text: unknown.length
            ? `Warning: unknown product ids: ${unknown.join(", ")}\n\n${url}`
            : url,
        },
      ],
      structuredContent: { url, message, unknownIds: unknown },
    };
  },
});
