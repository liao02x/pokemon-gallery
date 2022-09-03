import { POKE_API, POKE_SPECIES_API } from "@/constants"

const json = url => fetch(url).then(res => res.json())

export const getPokemon = id => json(`${POKE_API}/${id}`);

export const getPokemons = async (size = 30) => {
  let data;

  if (size === "all") {
    const d = await json(POKE_API);
    data = await json(`${POKE_API}?limit=${d.count}`);
  } else {
    data = await json(`${POKE_API}?limit=${size}`);
  }
  return await Promise.all(data.results.map(i => json(i.url)));
}

export async function getEvo (id) {
  const species = await json(`${POKE_SPECIES_API}/${id}/`);
  const evo = await json(species.evolution_chain.url);

  let node = evo.chain;
  const arr = [];

  while (node) {
    arr.push({
      "name": node.species.name,
      "id": node.species.url.match(/(\d+)/g)[1]
    });
    node = node.evolves_to[0];
  }
  return arr;
}
