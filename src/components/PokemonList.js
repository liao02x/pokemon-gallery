import {SimpleGrid} from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";


export default function PokemonList ({pokemons, setId}) {

  return (
    <SimpleGrid spacing="6" columns={[1, 1, 2, 3]}>
      {pokemons?.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          setSelected={() => setId(pokemon.id)}
        />
      ))}
    </SimpleGrid>
  );
}
