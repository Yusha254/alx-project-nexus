
import type { ProductDetailsPageProps } from "@/interfaces";
import ProductDetailsClient from "./ProductDetailsClient";


export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  
  const resolvedParams = await params as { asin: string };
  const { asin } = resolvedParams;

  return <ProductDetailsClient asin={asin} />;
}