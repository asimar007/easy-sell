import Card from "@/components/card";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Home() {
  const supabase = createClient();
  // Hello world
  // const products = [
  //   {
  //     id: 0,
  //     name: "Buttur Chiken",
  //     description: "Buttur Chiken very Tasty Food",
  //     price: 250,
  //     imageUrl:
  //       "https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];
  const { data: products, error } = await supabase
    .from("easysell-products")
    .select();

  if (!products) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Top Products Section */}
      <section className="mb-16">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
          <div className="xl:w-1/3">
            <h2 className="text-4xl font-bold mb-6">OUR TOP PRODUCTS</h2>
            <p className="text-xl text-gray-600">
              You can pay to boost your products here.
            </p>
          </div>
          <div className="xl:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={`${product.name}-${product.id}`}
                  {...product}
                  imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8">ALL PRODUCTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={`${product.name}-${product.id}`}
              {...product}
              imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
