import { PokemonCard, DbPokemon } from "./Pokemon";
import axios from "axios";
import { usePokemon } from "../hooks/pokemon";

export interface Trainer {
  id: number;
  name: string;
  money: number;
  caughtPokemon: DbPokemon[];
  ownedPokemon: DbPokemon[];
}

export interface TrainerProps {
  trainer: Trainer;
}

export function TrainerCard({ trainer }: TrainerProps) {

  const [pokemon, addPokemon, removePokemon, replacePokemon] = usePokemon(trainer.ownedPokemon);   

  function handleCatchPokemon() {
    const newPokemon: DbPokemon = {
      id: 0,
      dex: Math.floor(Math.random() * 649) + 1,
      name: "",
      catcherId: trainer.id,
      ownerId: trainer.id,
    } 

    console.log(pokemon);

    addPokemon(newPokemon);
    axios.post("https://localhost:7125/pokemon", newPokemon)
    .then((response) => {
      console.log(response.data);
      replacePokemon(0, response.data)
      console.log(pokemon);
    })
    .catch((error) => {
      removePokemon(0);
      console.log(error)
    });
  }

  function handleReleasePokemon(id: number) {
    const removedPokemon = removePokemon(id);
    axios.delete(`https://localhost:7125/pokemon/${id}`)
    .catch((error) => {
      // This might remove an item in the middle of an array and put it at the end,
      // so an error here could be visible.
      if (removedPokemon) addPokemon(removedPokemon);
      console.log(error)
    });
  }

  if (pokemon === undefined) return <>Loading...</>;

  return (
    <div className="p-4 my-2 mx-auto bg-gray-100 rounded-lg">
      <div className="text-lg text-center font-medium mb-2 bg-white rounded-t-lg">
        {trainer.name}'{!trainer.name.endsWith('s') && "s"} Pokémon
      </div>
      <div className="grid grid-cols-6 gap-1">
        {pokemon.map((pokemon) =>
          pokemon !== undefined &&
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            handleRelease={() => handleReleasePokemon(pokemon.id)}
          />
        )}
        <div className="w-24 h-36 transition ease-in-out hover:scale-110">
          <button 
            className="w-[5.5rem] h-36 border border-gray-300 rounded m-2 text-2xl text-gray-400"
            onClick={handleCatchPokemon}
          >
          +
          </button>
        </div>
      </div>
    </div>
  );
}