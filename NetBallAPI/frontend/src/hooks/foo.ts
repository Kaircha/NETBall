import { useEffect, useState } from "react";
import { DbPokemon } from "../components/Pokemon";
import { MainClient } from "pokenode-ts";
import { usePreviousValue } from "./previousValue";

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

export function useFoo(initialPokemon: DbPokemon[]) {

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
    }
    function removePokemon(id: number) {
        setPokemon(pokemon.filter(p => p.id !== id))
    }

    return [pokemon, addPokemon, removePokemon] as const;

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