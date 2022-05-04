import {useEffect, useMemo, useState} from "react";
import {
  Container,
  Flex,
  Heading,
  Input,
  SkeletonText,
  Spacer,
  VStack
} from "@chakra-ui/react";

import PokemonList from "components/PokemonList";
import PokemonDetail from "components/PokemonDetail";
import TypeSelect from "components/TypeSelect";

import {getPokemons} from "api";


export default function App () {

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState(null);
  const [selectedId, setSelectedIdInner] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const filteredPokemons = useMemo(() => {
    if (!pokemons) return null;

    let data = pokemons;
    if (filterBy) {
      data = data.filter((pokemon) => pokemon.types.some((type) => type.type.name === filterBy));
    }
    if (searchBy) {
      data = data.filter((pokemon) => pokemon.name.toLowerCase().includes(searchBy.toLowerCase()));
    }
    return data;
  },[pokemons, filterBy, searchBy]);


  useEffect(() => {
    setLoading(true);
    getPokemons()
      .then(setPokemons)
      .then(() => setLoading(false));
  },[]);

  const setSelectedId = (id) => typeof id === "number" ?
    setSelectedIdInner(`${id}`) :
    setSelectedIdInner(id);

  const handleSearch = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <Container maxW="1280" px="10" py="5">
      <VStack align="stretch" px={4}>
        <Heading as="h1" mb="4" textAlign="center">Pokemon Gallery</Heading>
        <Flex>
          <Input
            maxW="300"
            mr="2"
            placeholder="Search"
            value={searchBy}
            onChange={handleSearch}
          />
          <Spacer />
          <TypeSelect value={filterBy} onChange={setFilterBy} />
        </Flex>
        <Spacer />
        <SkeletonText noOfLines={30} spacing="6" isLoaded={!loading}>
          <PokemonList pokemons={filteredPokemons} setId={setSelectedId} />
        </SkeletonText>
      </VStack>
      <PokemonDetail id={selectedId} setId={setSelectedId} />
    </Container>
  );

}
