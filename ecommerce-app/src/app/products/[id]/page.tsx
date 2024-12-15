import SendTrackingEvent from "@/components/SendTrackingEvent";
import axios from "axios";
import Image from "next/image";
import { ProductDetail } from "@/utils/types";

async function fetchProduct(id: string): Promise<ProductDetail> {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}?populate=*`);
  const product = data.data;

  return {
    name: product.name,
    description: product.description[0]?.children[0]?.text || "Description non disponible",
    price: product.price || null,
    imageUrl: product.image[0].url,
    metaTitle: product.seo[0].metaTitle || "Titre du produit par défaut",
    metaDescription: product.seo[0].metaDescription || "Description SEO du produit par défaut",
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <SendTrackingEvent event="page_view" value={{ page_name: "Détail Produit", page_path: `/products/${id}` }} />
      <SendTrackingEvent event="product_view" value={{ product_name: product.name, product_id: id, product_price: product.price || null }} />

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{product.name}</h1>

      <div className="flex justify-center mb-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.imageUrl}`}
          alt={product.name}
          className="w-full sm:w-3/4 lg:w-1/2 h-auto object-cover rounded-lg"
          width={500}
          height={500}
        />
      </div>

      <p className="text-lg sm:text-xl mb-4 text-center">{product.description}</p>

      {product.price && <p className="text-xl font-semibold mt-4 text-center">Prix: {product.price}€</p>}
    </div>
  );
}
