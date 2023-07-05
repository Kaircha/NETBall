import { useEffect, useState } from "react";
import { MainClient, Pokemon as ApiPokemon } from "pokenode-ts";
import { PokemonCard, DbPokemon } from "./Pokemon";
import axios from "axios";

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
  const [ownedApiPokemon, setOwnedApiPokemon] = useState<ApiPokemon[]>();
  const [ownedDbPokemon, setOwnedDbPokemon] = useState<DbPokemon[]>(trainer.ownedPokemon);
  const api = new MainClient();

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        ownedDbPokemon.map((pokemon) =>
          api.pokemon.getPokemonById(pokemon.dex)
        )
      );
      setOwnedApiPokemon(data);
    })();
  }, [trainer, trainer.ownedPokemon, ownedDbPokemon]);

  function handleCatchPokemon() {
    axios.post("https://localhost:7125/pokemon", {
      id: 0,
      dex: Math.floor(Math.random() * 649) + 1,
      catcherId: trainer.id,
      ownerId: trainer.id,
    })
    .then((response) => setOwnedDbPokemon([...ownedDbPokemon, response.data]))
    .catch((error) => console.log(error));
  }

  function handleReleasePokemon(id: number) {
    axios.delete(`https://localhost:7125/pokemon/${id}`)
    .then(() => {
      setOwnedDbPokemon(ownedDbPokemon.filter(x => x.id != id))
    })
    .catch((error) => console.log(error));
  }

  if (ownedApiPokemon === undefined) return <>Loading...</>;

  return (
    <div className="p-4 my-2 mx-auto bg-gray-100 rounded-lg">
      <div className="text-lg text-center font-medium mb-2 bg-white rounded-t-lg">
        {trainer.name}'{!trainer.name.endsWith('s') && "s"} Pokémon
      </div>
      <div className="grid grid-cols-6 gap-1">
        {ownedApiPokemon.map((apiPokemon, i) =>
          ownedDbPokemon[i] !== undefined &&
          <PokemonCard 
            key={ownedDbPokemon[i].id} 
            apiPokemon={apiPokemon} 
            dbPokemon={ownedDbPokemon[i]} 
            handleRelease={() => handleReleasePokemon(ownedDbPokemon[i].id)}
          />
        )}
        <div className="w-24 h-36">
          <button 
            className="w-20 h-32 border m-2 text-2xl text-gray-400"
            onClick={handleCatchPokemon}
          >
          +
          </button>
        </div>
      </div>
    </div>
  );
}