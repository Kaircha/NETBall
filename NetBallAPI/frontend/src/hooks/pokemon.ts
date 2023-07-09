import { useEffect, useState } from "react";
import { DbPokemon } from "../components/Pokemon";
import { MainClient } from "pokenode-ts";
import { usePreviousValue } from "./previousValue";
import { produce } from 'immer';

const api = new MainClient();
async function fetchPokemon(pokemon: DbPokemon[]) {
    // const data = await Promise.all(
    //     pokemon.map(async pokemon => {
    //         const result = await api.pokemon.getPokemonById(pokemon.dex);
    //         return {...pokemon, api: result}
    //     })
    // );
    //Promise<T>[] -> Promise<T[]>
    return await Promise.all(
        pokemon.map(async pokemon => ({
            ...pokemon, 
            api: await api.pokemon.getPokemonById(pokemon.dex)
        }))
    );
    
}

export function usePokemon(initialPokemon: DbPokemon[]) {

    const [pokemon, setPokemon] = useState(initialPokemon)
    const oldPokemon = usePreviousValue(pokemon)
    // get a list of db pokemon and a trainer on init
    // get api pokemon on "mount"
    useEffect(() => {
        fetchPokemon(initialPokemon).then(setPokemon)
    }, [])

    useEffect(() => {
        if(pokemon.length > oldPokemon.length) {
            const lastElem = pokemon[pokemon.length - 1];
            const everythingButLast = pokemon.slice(0, pokemon.length - 1);
            fetchPokemon([lastElem])
                .then(([result]) => 
                    setPokemon([...everythingButLast, result])
                )
        } 
    }, [pokemon])

    function addPokemon(newPokemon: DbPokemon) {
      setPokemon([...pokemon, newPokemon])
      // setPokemon(produce(pokemon, draft => {
      //   draft.push(newPokemon)
      // }))
    }

    // Why is JS so garbage? No Remove method that returns the removed element
    function removePokemon(id: number) {
      const removedPokemon = pokemon.find(p => p.id === id);
      setPokemon(pokemon.filter(p => p.id !== id))
      return removedPokemon;
    }

    function replacePokemon(id: number, newPokemon: DbPokemon) {
      // const index = pokemon.findIndex(p => p.id === id);
      // const beforeFound = pokemon.slice(0, index - 1);
      // const afterFound = pokemon.slice(index + 1);
      // setPokemon([...beforeFound, newPokemon, ...afterFound]);
      // produce takes:
      //   the object you wanna mutate
      //   a function, from a _draft_ of the object (it looks like the object and quacks like the object)
      //      returns either: a modified object, or void
      const producedPokemon = produce(pokemon, draftPokemon => {
        const index = draftPokemon.findIndex(p => p.id === id);
        draftPokemon.splice(index, 1, newPokemon); // returns the removed values  
      })
      setPokemon(producedPokemon);
    }

    return [pokemon, addPokemon, removePokemon, replacePokemon] as const;

    // whenever that list changes, refresh api
}

// function Test() {
//     //RUNS ON EVERY RE-RENDER
//     useEffect(() => {
//         console.log('render')
//     });
//     //RUNS ONLY ON FIRST RERENDER
//     useEffect(() => {
//         console.log('render')
//     }, []);
// }