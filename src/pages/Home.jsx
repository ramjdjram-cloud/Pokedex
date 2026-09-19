import { useState, useEffect } from 'react'

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function obtenerPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
        );
        if (!response.ok) {
          throw new Error('Respuesta no válida del servidor')
        }
        const data = await response.json();

        setPokemons(data.results.map((item) => {
          // La url termina en "/{id}/", extraemos ese id
          const id = item.url.split('/').filter(Boolean).pop();
          return {
            name: item.name,
            id,
            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }
        }))
        
        setLoading(false)
      } catch (error) {
        setError('No se pudieron cargar los Pokémon')
        setLoading(false)
      }
    }
    obtenerPokemon();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Pokédex</h1>
      {loading && <p className="mt-4 text-slate-500">Cargando Pokémon...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && !error && (
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <div key={p.id} className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md">
          <img src={p.imagen} alt={p.name} className="mx-auto h-24 w-24 object-contain"/>
          <p className="mt-2 font-semibold capitalize">{p.name}</p>  
        </div>
      ))}
      </div>
      )}
    </main>
  );
}

export default Home;
