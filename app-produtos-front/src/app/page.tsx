"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function Home() {
  const [produtos, atualizarProdutos] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    getProdutosTodos()
      .then((resultado) => {
        atualizarProdutos(resultado.data.products);
      })
      .catch(() => {
        setErro("Não foi possível carregar os produtos. Tente novamente mais tarde.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  function handleBusca(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = new FormData(form).get("produto");

    if (typeof value === "string") {
      setPesquisa(value.trim());
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPesquisa(event.target.value.trim());
  }

  const produtosFiltrados = pesquisa 
    ? produtos.filter((produto) =>
        produto.title.toLowerCase().includes(pesquisa.toLowerCase()),
      )
    : produtos;

  return (
    <div>
      <header>
        <h1>Pesquisa de produtos</h1>
        <form onSubmit={handleBusca}>
          <div className="form-pesquisa">
            <label htmlFor="produto">Nome do produto:</label>
            <input type="text" name="produto" id="produto" value={pesquisa} onChange={handleInputChange} required />
          </div>
          <div className="form-pesquisa">
            <input type="submit" />
          </div>
        </form>
      </header>
      <main>
        <h1>Produtos</h1>

        {carregando && <p>Carregando produtos...</p>}
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {!carregando && !erro && produtos.length === 0 && <p>Nenhum produto encontrado.</p>}

        <div className="grid-produtos">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="card">
              <img src={produto.thumbnail} alt={produto.title} width={200} height={140} />
              <div className="container">
                <h4>{produto.title}</h4>
                <p>{produto.description}</p>
                <p>R$ {produto.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}







































// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
