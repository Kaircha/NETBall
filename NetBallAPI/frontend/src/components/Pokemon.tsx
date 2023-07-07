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
  handleRelease: () => void;
}

export function pokemonFullName(name: string) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

export function pokemonDisplayName(name: string) {
  return (name[0].toUpperCase() + name.slice(1).toLowerCase()).split('-')[0];
}

export function PokemonCard({ apiPokemon, dbPokemon, handleRelease }: PokemonProps) {
  const fullName: string = pokemonFullName(apiPokemon.name);
  const displayName: string = pokemonDisplayName(apiPokemon.name);

  return (
    <div 
      id={dbPokemon.id.toString()}
      className="w-24 h-40 m-1 bg-white bg-repeat bg-[length:40px] rounded-lg transition ease-in-out hover:scale-110" 
      style={{backgroundImage: `url(./pokecard-bg.png)`}}
    >
      <div className="absolute w-24 flex">
        {apiPokemon.types.map((type) => 
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${apiPokemon.id}.gif`}
          alt={displayName}
        />
      </div>
        <div className="w-24 h-5 text-center font-medium bg-white border-t">
          {dbPokemon.name ? dbPokemon.name : displayName}
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