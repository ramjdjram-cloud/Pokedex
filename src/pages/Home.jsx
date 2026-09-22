import { useState, useEffect } from "react";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [pokemonsDelTipo, setPokemonsDelTipo] = useState([]);

  useEffect(() => {
    async function obtenerPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
        );
        if (!response.ok) {
          throw new Error("Respuesta no válida del servidor");
        }
        const data = await response.json();

        setPokemons(
          data.results.map((item) => {
            const id = item.url.split("/").filter(Boolean).pop();
            return {
              name: item.name,
              id,
              imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          }),
        );

        const responseTipos = await fetch("https://pokeapi.co/api/v2/type/");
        if (!responseTipos.ok) {
          throw new Error("Respuesta no válida del servidor");
        }
        const dataTipos = await responseTipos.json();
        setTipos(dataTipos.results.map((tipo) => tipo.name));

        setLoading(false);
      } catch (error) {
        setError("No se pudieron cargar los Pokémon");
        setLoading(false);
      }
    }
    obtenerPokemon();
  }, []);

  useEffect(() => {
    if (tipoSeleccionado === "") {
      setPokemonsDelTipo([]);
      return;
    }

    async function cargarTipo() {
      try {
        const responseTipo = await fetch(
          `https://pokeapi.co/api/v2/type/${tipoSeleccionado}`,
        );
        if (!responseTipo.ok) {
          throw new Error("Respuesta no válida del servidor");
        }
        const dataTipo = await responseTipo.json();

        setPokemonsDelTipo(
          dataTipo.pokemon
            .map((p) => {
              const id = p.pokemon.url.split("/").filter(Boolean).pop();
              return {
                name: p.pokemon.name,
                id,
                imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              };
            })
            .filter((pokemon) => Number(pokemon.id) <= 151),
        );
      } catch (error) {
        setError("No se pudieron cargar los Pokémon de este tipo");
      }
    }

    cargarTipo();
  }, [tipoSeleccionado]);

  const listaBase = tipoSeleccionado === "" ? pokemons : pokemonsDelTipo;

  const filtrados = listaBase.filter((p) =>
    p.name.includes(busqueda.toLowerCase()),
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Pokédex</h1>
      {loading && <p className="mt-4 text-slate-500">Cargando Pokémon...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <input
        value={busqueda}
        placeholder="Buscar Pokémon"
        className="w-full rounded-lg border border-slate-300 px-4 py-2"
        onChange={(e) => setBusqueda(e.target.value)}
      ></input>

      <select
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
        className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2"
      >
        <option value="">Todos los tipos</option>
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo} className="capitalize">
            {tipo}
          </option>
        ))}
      </select>

      {!loading && !error && (
        <>
          {filtrados.length === 0 && (
            <p className="mt-4 text-slate-500">No se encontraron Pokémon</p>
          )}

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtrados.map((p) => (
              <div
                key={p.id}
                className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md"
              >
                <img
                  src={p.imagen}
                  alt={p.name}
                  className="mx-auto h-24 w-24 object-contain"
                />
                <p className="mt-2 font-semibold capitalize">{p.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Home;
