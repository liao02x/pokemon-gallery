import {Select} from "@chakra-ui/react";

const types = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy"
];


export default function TypeSelect ({value, onChange}) {

  return (
    <Select maxW="100" placeholder="All" value={value} onChange={(e) => onChange(e.target.value)}>
      {types.map((type) => <option value={type} key={type}>{type}</option>)}
    </Select>
  );
}
