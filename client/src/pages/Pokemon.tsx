import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "./fetching";

function Pokemon() {
  const { name } = useLoaderData() as { name: string };

  const { data: pokemon } = useQuery(fetchPokemon(name));

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}

export default Pokemon;
