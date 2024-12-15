import SendTrackingEvent from "@/components/SendTrackingEvent";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SendTrackingEvent event="page_view" value={{ page_name: "Accueil", page_path: "/" }} />
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre boutique !</h1>
      <Link href="/products" className="text-lg text-blue-500 underline hover:text-blue-700">
        Découvrez nos produits
      </Link>
    </div>
  );
}
