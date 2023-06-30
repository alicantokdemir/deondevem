"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_PRODUCT = {
  name: "Cacau",
  plantadaNo: "MT - Campo Grande",
  plantadaNaData: "2019",
  steps: [
    {
      description:
        "1- Aqui voce pode ver a fazenda e os produtos seram plantados:",
      media: "/step1.jpg",
    },
    {
      description: "2- Ele esta crescendo:",
      media: "/step2.jpg",
    },
    {
      description: "3- Pronto para colheita :)",
      media: "/step3.jpg",
    },
    {
      description: "4- Chegando nosso supermercado:",
      media: "/step4.jpg",
    },
  ],
};

export default function Product({ params }: { params: any }) {
  const [product, setProduct] = useState<any>({ steps: [] });

  async function loadProduct(productId: string) {
    const response = await fetch("http://localhost:5001/products/" + productId);
    const jsonData = await response.json();
    console.log("hey json ", jsonData);
    setProduct(jsonData);
  }

  useEffect(() => {
    loadProduct(params.productId);
  }, []);

  return (
    <main className="flex relative min-h-screen flex-col p-6 bg-[url('/bg.jpg')] bg-cover">
      <div className="bg-white bg-opacity-70 w-full h-full top-0 left-0 absolute"></div>
      <div className="relative mb-24 text-2xl">
        <p>
          Produto: <span className="font-bold">{product.nome}</span>
        </p>
        <p>
          Plantada no: <span className="font-bold">{product.plantada_no}</span>{" "}
        </p>
        <p>
          Ano:{" "}
          <span className="font-bold">
            {new Date(product.plantada_na_data).getFullYear()}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {product.etapas &&
          product.etapas.map((step: any, i: number) => (
            <div key={i} className="relative mb-24">
              <p className="mb-3 h-[50px] overflow-auto">{step.descricao}</p>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mx-auto"
                src={step.media_url.startsWith("http") ? step.media_url : ""}
                alt=""
                width={300}
                height={100}
                priority
              />
            </div>
          ))}
      </div>
    </main>
  );
}
