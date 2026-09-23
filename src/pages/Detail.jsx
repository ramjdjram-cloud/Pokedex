import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
        </div>
      )}
    </main>
  );
}

export default Detail;
