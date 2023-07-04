import { useEffect, useState } from 'react';
import { MainClient, Pokemon } from 'pokenode-ts';
import { DbPokemon, renderPokemon } from './Pokemon'

export type Trainer = {
  id: number;
  name: string;
  money: number;
  caughtPokemon: DbPokemon[];
  ownedPokemon: DbPokemon[];
}

export function renderTrainer(trainer: Trainer) {
  const [ownedPokemon, setOwnedPokemon] = useState<Pokemon[]>();
  const api = new MainClient();

  useEffect(() => {
    (async() => {
      const data = await Promise.all(trainer.ownedPokemon.map((pokemon) => api.pokemon.getPokemonById(pokemon.dex)));
      setOwnedPokemon(data);
    })()
    }), [trainer, trainer.ownedPokemon]

  if (ownedPokemon != undefined) return (
    <div key={trainer.id} className="trainer">
      {trainer.name + " has " + trainer.ownedPokemon.length + " Pokémon"}
      <div className="flex flex-row">
        {ownedPokemon.map(pokemon => renderPokemon(pokemon))}
      </div>
    </div>
  )
}