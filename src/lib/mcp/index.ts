import { defineMcp } from "@lovable.dev/mcp-js";
import listCategories from "./tools/list-categories";
import listProducts from "./tools/list-products";
import getProduct from "./tools/get-product";
import buildEnquiryLink from "./tools/enquiry-link";

export default defineMcp({
  name: "allrightpack-mcp",
  title: "Allright Pack",
  version: "0.1.0",
  instructions:
    "Tools to browse the Allright Pack packaging catalog (Qatar). Use list_categories to discover product categories, list_products to search or filter products, get_product for full details, and build_enquiry_link to draft a WhatsApp sales enquiry.",
  tools: [listCategories, listProducts, getProduct, buildEnquiryLink],
});
