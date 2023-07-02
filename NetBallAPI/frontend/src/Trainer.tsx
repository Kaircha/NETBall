import { Pokemon, renderPokemon } from './Pokemon'

export type Trainer = {
  id: number;
  name: string;
  money: number;
  caughtPokemon: Pokemon[];
  ownedPokemon: Pokemon[];
}

export function renderTrainer(trainer: Trainer) {
  return(
    <div key={trainer.id} className="trainer">
      {trainer.name + " has " + trainer.ownedPokemon.length + " Pokémon"}
      <div>
        {trainer.ownedPokemon != null && trainer.ownedPokemon.map(pokemon => renderPokemon(pokemon))}
      </div>
    </div>
  )
}