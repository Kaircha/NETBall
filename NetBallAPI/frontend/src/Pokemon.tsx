import { Pokemon as ApiPokemon } from "pokenode-ts";

export type DbPokemon = {
  id: number;
  dex: number;
  name: string;
  catcherId: number;
  ownerId: number;
}

export interface PokemonProps {
  apiPokemon: ApiPokemon;
  dbPokemon: DbPokemon;
}

export function Pokemon({ apiPokemon, dbPokemon }: PokemonProps) {
  const capitalizedName: string = apiPokemon.name[0].toUpperCase() + apiPokemon.name.slice(1).toLowerCase();
  
  return (
    <div className="w-24 h-36">
      <div>
        <img
          className="h-24 object-none object-cover object-bottom"
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
            apiPokemon.id +
            ".gif"
          }
          alt={capitalizedName}
        />
      </div>
        <div className="w-24 h-6 align-text-middle text-center font-medium">
          {dbPokemon.name ? dbPokemon.name : capitalizedName}
        </div>
        <div className="w-24 h-6 align-text-middle text-center font-light">
          {capitalizedName}
        </div>
    </div>
  );
}