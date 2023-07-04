import { MainClient, Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

export type DbPokemon = {
  id: number;
  dex: number;
  name: string;
  catcherId: number;
  ownerId: number;
}

export function renderPokemon(pokemon: Pokemon) {
  return (
    <div key={pokemon.id} className="w-24 h-36"> 
      <div>
        <img 
          className="h-24 object-none object-cover object-bottom" 
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + pokemon.id + ".gif"} 
          alt={pokemon.name}
        />
      </div>
      <div className="w-24 h-6 align-text-middle text-center font-medium">
        {pokemon.name}
      </div>
    </div>
  )
}
/*
export function renderPokemon(dbPokemon: DbPokemon) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const api = new MainClient();

  useEffect(() => {
    (async () => {
      try { 
        const data = await api.pokemon.getPokemonById(dbPokemon.dex);
        setPokemon(data);
      } catch (error: unknown) { 
        console.error(error);
      }
    })()
  }, [dbPokemon, dbPokemon.dex])

  if (pokemon != undefined) return (
    <div key={dbPokemon.id} className="w-24 h-36"> 
      <div>
        <img 
          className="h-24 object-none object-cover object-bottom" 
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + dbPokemon.dex + ".gif"} 
          alt={pokemon.name}
        />
      </div>
      <div className="w-24 h-6 align-text-middle text-center font-medium">
        {dbPokemon.name == null ? pokemon.name : dbPokemon.name}
      </div>
      {dbPokemon.name != null && (
        <div className="w-24 h-6 align-text-middle text-center font-light text-sm">
        {pokemon.name}
        </div>
      )}
    </div>
  )
}*/