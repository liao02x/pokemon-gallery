import {Box, Center, Heading, Image, Tag, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {getTitle, getUrl} from "@/utils";


export default function PokemonCard ({pokemon, setSelected}) {

  return (
    <Box
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg="yellow.100"
      transition="all 0.2s"
      _hover={{
        transform: "scale(1.05)",
        cursor: "pointer",
      }}
      onClick={setSelected}
    >
      <Center>
        <Image p={5} boxSize="300" fit="contain" src={getUrl(pokemon.id)} alt={pokemon.name} />
      </Center>
      <Heading fontSize="xl" textTransform="capitalize">
        {getTitle(pokemon)}
      </Heading>
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
    </Box>
  );
}
