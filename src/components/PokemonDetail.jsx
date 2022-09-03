import {useEffect, useState} from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Image,
  SimpleGrid,
  SkeletonText,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import RadarChart from "react-svg-radar-chart";

import {getEvo, getPokemon} from "@/api";
import {getTitle, getUrl} from "@/utils";

const Title = ({children}) => <Heading as="h3" size="md" mb="2">{children}</Heading>;


export default function PokemonDetail ({id, setId}) {

  const [pokemon, setPokemon] = useState(null);
  const [evo, setEvo] = useState(null);

  useEffect(() => {
    if (id) {
      getPokemon(id).then(setPokemon);
      getEvo(id).then(setEvo);
    }
  },[id]);

  const radarData = pokemon?.stats?.map((i) => [
    i.stat.name,
    i.base_stat / 100
  ]);

  const handleClose = () => {
    setId(null);
    setPokemon(null);
    setEvo(null);
  };

  return (
    <Drawer
      size="xl"
      placement="right"
      isOpen={!!id}
      onClose={handleClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader textTransform="capitalize">
          {pokemon
            ? getTitle(pokemon)
            : "pokemon"}
        </DrawerHeader>
        <DrawerBody>
          {pokemon &&
            <VStack bg="blue.100" p={4} align="stretch">
              <Box>
                <Title>Basics</Title>
                <SimpleGrid spacing="6" columns={[1, 1, 3]}>
                  <Image boxSize="250" src={getUrl(pokemon.id)} alt={pokemon.name} />
                  <Box>
                    <SimpleGrid h="250" columns={[1]}>
                      <Text>Height: {pokemon.height}</Text>
                      <Text>Width: {pokemon.weight}</Text>
                      <Wrap>
                        <WrapItem>
                          <Text>Type:</Text>
                        </WrapItem>
                        {pokemon.types.map((type) => {
                          const key = type.type.name;
                          return (
                            <WrapItem key={key}>
                              <Tag>{key}</Tag>
                            </WrapItem>
                          );
                        })}
                      </Wrap>
                      <Wrap>
                        <WrapItem>
                          <Text>Abilities:</Text>
                        </WrapItem>
                        {pokemon.abilities.map((ability) => {
                          const key = ability.ability.name;
                          return (
                            <WrapItem key={key}>
                              <Tag>{key}</Tag>
                            </WrapItem>
                          );
                        })}
                      </Wrap>
                    </SimpleGrid>
                  </Box>
                  <RadarChart
                    size={250}
                    data={[{
                      data: Object.fromEntries(radarData)
                    }]}
                    captions={
                      Object.fromEntries(radarData.map(([i]) => [i, i]))
                    }
                  />
                </SimpleGrid>
              </Box>
              <Box>
                <Title>Move</Title>
                <Wrap>
                  {pokemon.moves.map((move) => {
                    const key = move.move.name;
                    return (
                      <WrapItem key={key}>
                        <Tag>{key}</Tag>
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </Box>
              <SkeletonText noOfLines={8} spacing="6" isLoaded={!!evo}>
                <Box>
                  <Title>Evolution</Title>
                  <SimpleGrid spacing="6" columns={[1,1,3]}>
                    {evo?.map((i) => (
                      <Box
                        key={i.name}
                        onClick={id !== i.id ? () => setId(i.id) : null}
                        _hover={id !== i.id ? {cursor: "pointer"} : {}}
                      >
                        <Image boxSize="250" fit="contain" src={getUrl(i.id)} alt={i.name} />
                        <Text textTransform="capitalize">{getTitle(i)}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </SkeletonText>
            </VStack>
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
