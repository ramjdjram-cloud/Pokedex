import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const coloresDeTipo = {
  normal: "bg-gray-400 text-white",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-slate-900",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-slate-900",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-600 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-violet-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-purple-800 text-white",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-gray-700 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-slate-900",
};

function Detail() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritos") || "[]");
  });

  useEffect(() => {
    async function obtenerPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Respuesta no válida del servidor");
        }
        const data = await response.json();

        setPokemon({
          name: data.name,
          id: data.id,
          imagen: data.sprites.other["official-artwork"].front_default,
          tipos: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            valor: s.base_stat,
          })),
        });

        setLoading(false);
      } catch (error) {
        setError("No se pudieron cargar los Pokémon");
        setLoading(false);
      }
    }
    obtenerPokemon();
  }, [id]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {loading && <p className="mt-4 text-slate-500">Cargando Pokémon...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && !error && pokemon && (
        <div className="text-center">
          <img
            src={pokemon.imagen}
            alt={pokemon.name}
            className="mx-auto h-64 w-64 object-contain"
          />
          <h1 className="mt-4 text-4xl font-bold capitalize">{pokemon.name}</h1>

          <div className="mt-4 flex justify-center gap-2">
            {pokemon.tipos.map((tipo) => (
              <span
                key={tipo}
                className={`rounded-full px-4 py-1 text-sm font-semibold capitalize ${coloresDeTipo[tipo]}`}
              >
                {tipo}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-sm text-left">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="mb-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="capitalize">{stat.name}</span>
                  <span>{stat.valor}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(stat.valor, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          
        </div>
      )}
    </main>
  );
}

export default Detail;
