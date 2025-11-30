import axios from "axios";
import { normalizeSearchProduct } from "@/utils/normalizeSearchProduct";
import { normalizeProductDetail } from "@/utils/normalizeProductDetail";

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

const client = axios.create({
  baseURL: "https://real-time-amazon-data.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
  },
});

export async function fetchProducts(query: string = "Phone", page = 2) {
  const effectiveQuery = query.trim() === "" ? "Electronics" : query;
  const res = await client.get("/search", {
    params: { query: effectiveQuery, page, country: "US", sort_by: "RELEVANCE" },
  });

  const items = res.data?.data?.products ?? [];
  return items.map(normalizeSearchProduct);
}

export async function fetchProductDetails(asin: string) {
  const res = await client.get("/product-details", {
    params: { asin, country: "US" },
  });

  const rawData = res.data?.data;

  if (!rawData) {
    throw new Error(`Product with ASIN ${asin} not found.`);
  }

  return normalizeProductDetail(rawData);
}
