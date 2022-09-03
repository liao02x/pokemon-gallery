import { POKE_CDN } from "@/constants"

export const getUrl = (id) => `${POKE_CDN}/${id}.png`;
export const getTitle = (pokemon) => `#${pokemon.id} ${pokemon.name}`;
