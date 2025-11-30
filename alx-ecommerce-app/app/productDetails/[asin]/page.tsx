"use client";
import { ProductDetails } from "@/components/ui/ProductDetail";
import type { UnifiedProduct, ProductDetailsPageProps } from "@/interfaces";
import { useProductDetails } from "@/hooks/useQuery";
import { redirect, useRouter } from "next/navigation";

export default function ProductDetailsPage(props: ProductDetailsPageProps) {
  const resolvedParams = props.params as { asin: string };
  const { asin } = resolvedParams;
  const { data: product, isLoading, error } = useProductDetails(asin as string);
  const router = useRouter();

  if (isLoading) return <p>Loading product details...</p>;
  if (error || !product) {
    console.error("Failed to load product details or product not found:", error);
    router.push("/");
    return null;
  }

  return (
    <div className="pt-10">
      <ProductDetails
        product={product}
      />
    </div>
  );
}
