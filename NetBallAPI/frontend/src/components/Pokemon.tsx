import { Pokemon as ApiPokemon } from "pokenode-ts";
import PokemonUtils from "../utils/pokemon";

export type DbPokemon = {
  id: number;
  dex: number;
  name: string;
  catcherId: number;
  ownerId: number;
  api?: ApiPokemon
}

export interface PokemonProps {
  pokemon: DbPokemon;
  handleRelease: () => void;
}



export function PokemonCard({ pokemon, handleRelease }: PokemonProps) {
  const fullName: string = PokemonUtils.fullName(pokemon.api?.name ?? "");
  const displayName: string = PokemonUtils.displayName(pokemon.api?.name ?? "");

  return (
    <div 
      id={pokemon.id.toString()}
      className="w-24 h-40 m-1 bg-white bg-repeat bg-[length:40px] rounded-lg transition ease-in-out hover:scale-110" 
      style={{backgroundImage: `url(./pokecard-bg.png)`}}
    >
      <div className="absolute w-24 flex">
        {pokemon.api?.types.map((type) => 
          <img
            key={type.slot}
            className="w-8 h-8 p-0.5"
            src={`./types/${type.type.name}.png`}
            alt={type.type.name}   
          />
        )}
      </div>
      <div>
        <img
          className="h-24 object-none object-cover object-bottom"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.api?.id}.gif`}
          alt={displayName}
        />
      </div>
        <div className="w-24 h-5 text-center font-medium bg-white border-t">
          {pokemon.name ?? displayName}
        </div>
        <div className="w-24 h-6 text-center font-light bg-white">
          {displayName}
        </div>
        <button 
          className="w-24 h-5 p-0.5 right-0 flex items-center justify-center border border-red-300 text-xs text-red-500 rounded-b-lg bg-white"
          onClick={handleRelease}
        >
        ✕
        </button>
    </div>
  );
}