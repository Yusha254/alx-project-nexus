"use client";
import { ProductDetails } from "@/components/ui/ProductDetail";
import type { UnifiedProduct, ProductDetailsPageProps } from "@/interfaces";
import { useProductDetails } from "@/hooks/useQuery";
import { redirect, useRouter } from "next/navigation";

export default async function ProductDetailsPage(props: ProductDetailsPageProps) {
  const params = await props.params;
  const { asin } = params;
  const { data, isLoading, error } = useProductDetails(asin as string);
  const router = useRouter();

  let product: UnifiedProduct | null = null;

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) {
    router.push("/");
    return null;
  }
  if (!product) {
    redirect("/");
  }

  return (
    <div className="pt-10">
      <ProductDetails
        product={product}
      />
    </div>
  );
}
