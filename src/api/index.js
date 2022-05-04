const json = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

export const getPokemon = async id => {
  return await json(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

export const getPokemons = async (size = 200) => {
  let data;

  if (size === "all") {
    const d = await json("https://pokeapi.co/api/v2/pokemon");
    data = await json(`https://pokeapi.co/api/v2/pokemon?limit=${d.count}`);
  } else {
    data = await json(`https://pokeapi.co/api/v2/pokemon?limit=${size}`);
  }
  return await Promise.all(data.results.map(async (i) => await json(i.url)));
}

export async function getEvo (id) {
  const species = await json(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
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
