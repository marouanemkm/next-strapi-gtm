import axios from "axios";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
};

async function fetchProducts(): Promise<Product[]> {
  const { data } = await axios.get("http://localhost:1337/api/products?populate=*");

  return data.data.map((item: any) => ({
    id: item.documentId,
    name: item.name,
    description: item.description[0].children[0].text,
    thumbnailUrl: item.image[0].formats.thumbnail.url,
  }));
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_name: "Produits",
      page_path: "/products",
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nos Produits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg">
            <img src={`http://localhost:1337${product.thumbnailUrl}`} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <Link href={`/products/${product.id}`} className="text-blue-500 underline hover:text-blue-700">
              Voir plus
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}