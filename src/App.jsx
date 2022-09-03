import {useEffect, useMemo, useState, useTransition} from "react";
import {
  Container,
  Flex,
  Heading,
  Input,
  SkeletonText,
  Spacer,
  Spinner,
  VStack
} from "@chakra-ui/react";

import PokemonList from "@/components/PokemonList";
import PokemonDetail from "@/components/PokemonDetail";
import TypeSelect from "@/components/TypeSelect";

import {getPokemons} from "@/api";


export default function App () {

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState(null);
  const [selectedId, setSelectedIdInner] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPokemons = useMemo(() => {
    if (!pokemons) return null;

    let data = pokemons;
    if (filter) {
      data = data.filter((pokemon) => pokemon.types.some((type) => type.type.name === filter));
    }
    return data;
  },[pokemons, filter]);

  const searchedPokemons = useMemo(() => {
    if (!filteredPokemons) return null;

    let data = filteredPokemons;
    if (query) {
      data = data.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()));
    }
    return data;
  },[filteredPokemons, query]);


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
    startTransition(() => setQuery(e.target.value));
  };

  const handleFilter = (value) => {
    setFilterBy(value);
    startTransition(() => setFilter(value));
  }

  return (
    <Container maxW="1280" px="10" py="5">
      <VStack align="stretch" px={4}>
        <Heading as="h1" mb="4" textAlign="center">Pokemon Gallery</Heading>
        <Flex>
          <Flex align="center">
            <Input
              maxW="300"
              mr="2"
              placeholder="Search"
              value={searchBy}
              onChange={handleSearch}
            />
            {isPending && <Spinner />}
          </Flex>
          <Spacer />
          <TypeSelect value={filterBy} onChange={handleFilter} />
        </Flex>
        <Spacer />
        <SkeletonText noOfLines={30} spacing="6" isLoaded={!loading}>
          <PokemonList pokemons={searchedPokemons} setId={setSelectedId} />
        </SkeletonText>
      </VStack>
      <PokemonDetail id={selectedId} setId={setSelectedId} />
    </Container>
  );

}
