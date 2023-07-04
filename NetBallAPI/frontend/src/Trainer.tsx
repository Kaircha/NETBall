import { useEffect, useState } from "react";
import { MainClient, Pokemon as ApiPokemon } from "pokenode-ts";
import { Pokemon, DbPokemon, PokemonProps } from "./Pokemon";

//problem #0: components always take an object, usually called 'props', that has the properties inside
// and you pass those one by one, so if you don't want to pass all the trainer props by themselves,
// wrap the object one more level
//tip #0: usually I'd say, use `interface` by default rather than `type`
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

//problem #1: you can only use hooks (use*) in React components. So, uppercase letter for components
//problem #1.5: don't make `renderX` functions, just call the function `X` and use it as a react component
//tip #1: you can extract properties in function parameters like this: in this case, it's like doing:
//function Trainer(props: TrainerProps) { const trainer = props.trainer }
export function TrainerCard({ trainer }: TrainerProps) {
  const [ownedPokemon, setOwnedPokemon] = useState<ApiPokemon[]>();
  const api = new MainClient();

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        trainer.ownedPokemon.map((pokemon) =>
          api.pokemon.getPokemonById(pokemon.dex)
        )
      );
      setOwnedPokemon(data);
    })();
  }, [trainer, trainer.ownedPokemon]);

  if (ownedPokemon === undefined) return <>Loading...</>;

  return (
    <>
      {trainer.name + " has " + trainer.ownedPokemon.length + " Pokémon"}
      <div className="flex flex-row">
        {ownedPokemon.map((apiPokemon, i) =>
          <Pokemon 
            key={trainer.ownedPokemon[i].id} 
            apiPokemon={apiPokemon} 
            dbPokemon={trainer.ownedPokemon[i]} 
          />
        )}
      </div>
    </>
  );
}