import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

async function pokemonQuery(name: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
}

export function fetchPokemon(name: string) {
  return {
    queryKey: ["pokemon", name],
    queryFn: () => pokemonQuery(name),
  };
}

export function loader(queryClient: QueryClient) {
  return async ({ params }) => {
    const { name } = params;

    await queryClient.ensureQueryData(fetchPokemon(name));

    return { name };
  };
}
