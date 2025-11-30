"use client";
import { ProductDetails } from "@/components/ui/ProductDetail";
import { useProductDetails } from "@/hooks/useQuery";
import { useRouter } from "next/navigation";

// Define simple props for the client component
interface ProductDetailsClientProps {
    asin: string;
}

export default function ProductDetailsClient({ asin }: ProductDetailsClientProps) {
    
    // Fetch data using the simple, resolved 'asin' string
    const { 
        data: product,
        isLoading, 
        error 
    } = useProductDetails(asin); 
    
    const router = useRouter();

    // -------------------------------------------------------------------
    // RENDER FLOW
    // -------------------------------------------------------------------

    if (isLoading) {
        return <p>Loading product details...</p>;
    }
    
    // After loading is complete (isLoading is false), check for failure/missing data.
    if (error || !product) { 
        console.error("Failed to load product details or product not found:", error);
        
        // This redirect prevents infinite loops when data is truly missing
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