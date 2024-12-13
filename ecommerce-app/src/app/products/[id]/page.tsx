import axios from "axios";

type ProductDetail = {
  name: string;
  description: string;
  price: number;
  imageUrl: any;
  metaTitle: string;
  metaDescription: string;
};

async function fetchProduct(id: string): Promise<ProductDetail> {
  const { data } = await axios.get(`http://localhost:1337/api/products/${id}?populate=*`);
  const product = data.data;

  console.log(product);

  return {
    name: product.name,
    description: product.description[0]?.children[0]?.text || "Description non disponible",
    price: product.price,
    imageUrl: product.image[0].url,
    metaTitle: product.seo[0].metaTitle || "Titre du produit par défaut",
    metaDescription: product.seo[0].metaDescription || "Description SEO du produit par défaut",
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

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

  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "product_view",
      product_id: id,
      product_name: product.name,
      product_price: product.price,
      page_name: "Détail Produit",
      page_path: `/products/${id}`,
    });
  }

  console.log(typeof window !== "undefined" && window.dataLayer);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <img src={`http://localhost:1337${product.imageUrl}`} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-semibold mt-4">Prix: {product.price}€</p>
    </div>
  );
}
