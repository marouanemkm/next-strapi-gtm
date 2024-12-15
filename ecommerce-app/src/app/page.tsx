import SendTrackingEvent from "@/components/SendTrackingEvent";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <SendTrackingEvent event="page_view" value={{ page_name: "Accueil", page_path: "/" }} />
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Bienvenue sur notre boutique !</h1>
      <Link href="/products" className="text-lg sm:text-xl text-blue-500 underline hover:text-blue-700">
        Découvrez nos produits
      </Link>
    </div>
  );
}
