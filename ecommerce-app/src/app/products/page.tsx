import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import SendTrackingEvent from "@/components/SendTrackingEvent";
import { ApiProductResponse, Product } from "@/utils/types";

async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`);
    return data.data.map((item: ApiProductResponse) => ({
      id: item.documentId,
      name: item.name,
      description: item.description[0]?.children[0]?.text || "Description indisponible",
      thumbnailUrl: item.image[0]?.formats.thumbnail?.url || "",
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto p-4">
      <SendTrackingEvent event="page_view" value={{ page_name: "Produits", page_path: "/products" }} />
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.thumbnailUrl}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
              width={500}
              height={300}
            />
            <h2 className="text-xl font-semibold text-center">{product.name}</h2>
            <p className="text-gray-700 text-center mb-4">{product.description}</p>
            <Link href={`/products/${product.id}`} className="text-blue-500 underline hover:text-blue-700 text-center">
              Voir plus
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
