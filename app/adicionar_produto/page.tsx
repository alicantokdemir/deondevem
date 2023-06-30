"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

async function postJSON(data: any) {
  try {
    const response = await fetch("http://localhost:5001/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function AddProduct() {
  const [steps, setSteps] = useState<any>([]);
  const router = useRouter();

  function addNewStep() {
    const newStep = {
      description: "",
      media: "",
    };

    setSteps((steps: any) => [...steps, newStep]);
  }

  async function handleSubmit(event: any) {
    const fd = new FormData(event.target);
    event.preventDefault();

    const stepKeys = Array.from(new Map(fd).keys()).filter(
      (keys) => keys.includes("step") && !keys.includes("media")
    );
    stepKeys.sort();
    const steps = [];

    for (let i = 0; i < stepKeys.length; i++) {
      const stepKey = stepKeys[i];
      steps.push({
        descricao: fd.get(stepKey),
        media_url: fd.get(stepKey + "_media"),
      });
    }

    const newProduct = {
      nome: fd.get("nomeProduto"),
      plantada_no: fd.get("plantadaNo"),
      plantada_na_data: fd.get("plantadaNaData"),
      etapas: steps,
    };

    for (let step of steps) {
      var data = new FormData();
      data.append("file", step.media_url as any);

      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      step.media_url = `http://localhost:5001/uploads/${result.file.filename}`;
    }

    postJSON(newProduct).then((res) => router.push("/qr/" + res.id));
  }

  return (
    <main className="flex relative min-h-screen flex-col p-6 bg-[url('/bg.jpg')] bg-cover justify-center items-center">
      <div className="bg-white bg-opacity-70 w-full h-full top-0 left-0 absolute"></div>
      <div className="w-full max-w-md relative">
        <h2 className="text-4xl mb-10 font-bold text-center">
          Adicionar Produto
        </h2>
        <form
          id="myForm"
          name="myFormName"
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nomeProduto"
            >
              Nome do produto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomeProduto"
              name="nomeProduto"
              type="text"
              placeholder="Nome do produto"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="plantadaNo"
            >
              Plantada na
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="plantadaNo"
              name="plantadaNo"
              type="text"
              placeholder="Plantada na"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="plantadaNaData"
            >
              Plantada na data
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="plantadaNaData"
              name="plantadaNaData"
              type="date"
              placeholder="Plantada na data"
            />
          </div>

          <div className="mb-4">
            <fieldset className="border border-solid border-gray-300 p-3">
              <legend className="text-sm">
                Etapas
                <button
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-white py-0 px-1 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={addNewStep}
                >
                  +
                </button>
              </legend>

              {steps.map((step: any, i: number) => (
                <React.Fragment key={i}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`step${i}`}
                  ></label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`step${i}`}
                    name={`step${i}`}
                    type="text"
                    placeholder={`Descrição etapa ${i + 1}`}
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`step${i}_media`}
                  ></label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`step${i}_media`}
                    name={`step${i}_media`}
                    type="file"
                  />
                  <p className="text-blue-500 text-xs italic">{step.media}</p>
                </React.Fragment>
              ))}
            </fieldset>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="reset"
            >
              Limpar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 DeOndeVem
        </p>
      </div>
    </main>
  );
}
