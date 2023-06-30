"use client";
import { QRCodeSVG } from "qrcode.react";

export default function Qr({ params }: { params: any }) {
  return (
    <main className="flex relative min-h-screen flex-col items-center p-6 md:p-24 bg-[url('/bg.jpg')] bg-cover">
      <div className="bg-white bg-opacity-70 w-full h-full top-0 left-0 absolute"></div>
      <div className="relative flex place-items-center mb-24 text-2xl font-bold">
        Gostaria de saber por quais etapas sua comida passou?
      </div>

      <div className="relative flex place-items-center mb-24 text-2xl font-bold">
        Só escaneie o qr abaixo e iniciar a jornada
      </div>

      <div className="relative flex place-items-center p-6 rounded-lg bg-white">
        <QRCodeSVG
          size={180}
          value={`${window.location.protocol}//${window.location.hostname}${
            window.location.port != "80" ? `:${window.location.port}` : ""
          }/${params.productId}`}
        />
        ,
      </div>
    </main>
  );
}
