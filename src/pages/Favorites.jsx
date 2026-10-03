import { Link } from "react-router-dom";
import { useState } from "react";

function Favorites() {
  const [favoritos] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritos") || "[]");
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">⭐ Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="mt-4 text-slate-500">Aún no tienes Pokémon favoritos.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favoritos.map((p) => (
            <Link key={p.id} to={`/pokemon/${p.id}`} className="block">
              <div className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md">
                <img
                  src={p.imagen}
                  alt={p.name}
                  className="mx-auto h-24 w-24 object-contain"
                />
                <p className="mt-2 font-semibold capitalize">{p.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;