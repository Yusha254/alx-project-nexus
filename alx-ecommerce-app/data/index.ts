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

export async function fetchProducts(query: string = "Phone", page = 1) {
  const res = await client.get("/search", {
    params: { query, page, country: "US", sort_by: "RELEVANCE" },
  });

  const items = res.data?.data?.products ?? [];
  return items.map(normalizeSearchProduct);
}

export async function fetchProductDetails(asin: string) {
  const res = await client.get("/product-details", {
    params: { asin, country: "US" },
  });

  return normalizeProductDetail(res.data?.data);
}
