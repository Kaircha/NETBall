import { useState } from "react";
import { MainClient, Pokemon as ApiPokemon } from "pokenode-ts";
import axios from "axios";
import { USER_ID } from '../utils/constants';
import PokemonUtils from "../utils/pokemon";

export enum CatchState {
  Begin,
  WildPokemon,
  BallThrown,
  PokemonCaught,
  PokemonForm,
}

export default function Catching() {
  const [wildPokemon, setWildPokemon] = useState<ApiPokemon>()
  const [catchState, setCatchState] = useState<CatchState>(CatchState.Begin)
  const [pokemonName, setPokemonName] = useState<string>();
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const api = new MainClient();

  async function handleEncounterPokemon() {
    const dex: number = Math.floor(Math.random() * 649) + 1;
    const pokemon = await api.pokemon.getPokemonById(dex);
    setWildPokemon(pokemon);
    setCatchState(CatchState.WildPokemon);
  }

  async function handleCatchPokemon() {
    if (catchState !== CatchState.WildPokemon || wildPokemon === undefined) return;
    setCatchState(CatchState.BallThrown);

    const catchRate = 0.9; // 65.61% chance to catch
    const fleeRate = 0.4; // 40% chance to flee after a failed catch

    for (let i = 0; i < 4; i++) {
      await new Promise(wait => setTimeout(wait, 1000))
      if (Math.random() > catchRate) {
        setCatchState(Math.random() > fleeRate ? CatchState.WildPokemon : CatchState.Begin);
        return;
      }
    }

    setCatchState(CatchState.PokemonCaught);
    await new Promise(wait => setTimeout(wait, 2000))
    // Could do a form here to name the pokemon etc. before continuing
    setCatchState(CatchState.PokemonForm);
    setIsPosted(false);
  }

  async function handlePostPokemon() {
    if (isPosted || catchState !== CatchState.PokemonForm || wildPokemon === undefined) return;
    setIsPosted(true);

    axios.post("https://localhost:7125/pokemon", {
      id: 0,
      dex: wildPokemon.id,
      name: pokemonName,
      catcherId: USER_ID,
      ownerId: USER_ID,
    })
    .then(() => setCatchState(CatchState.Begin))
    .catch((error) => console.log(error));
  }

  // Returns the Component correlating to each state
  switch (catchState) {
    case CatchState.Begin: return Begin();
    case CatchState.WildPokemon: return WildPokemon();
    case CatchState.BallThrown: return BallThrown();
    case CatchState.PokemonCaught: return PokemonCaught();
    case CatchState.PokemonForm: return PokemonForm();
  }

  function Begin() {
    return (
      <div className="grid place-items-center h-screen">
        <button
          className="w-48 h-16 text-lg text-center font-medium bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleEncounterPokemon}
          >
          Walk into Grass
        </button>
      </div>
    );
  }

  function WildPokemon() {
    return (
      <>
        <div className="grid place-items-center h-screen">
          <div className="h-48 w-48">
            {(wildPokemon !== undefined) && (
              <>           
                <img 
                  className="scale-[3]"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${wildPokemon.id}.gif`}
                  alt={"test"}
                  style={{imageRendering: "pixelated"}}
                />
              </>
            )}
          </div>
          <div>
            <button className="animate-bounce" onClick={handleCatchPokemon}>
              <img
                className="scale-[6]"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`}
                alt={"ball"}
                style={{imageRendering: "pixelated"}}
                />
            </button>
          </div>
        </div>
      </>
    )
  }

  function BallThrown() {
    return (
      <div className="grid place-items-center h-screen">
        <img
          className="origin-bottom animate-wiggle"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`}
          alt={"ball"}
          style={{imageRendering: "pixelated"}}
        />
      </div>
    )
  }

  function PokemonCaught() {
    return (
      <div className="grid place-items-center h-screen">
        <img
          className="origin-bottom scale-[4]"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`}
          alt={"ball"}
          style={{imageRendering: "pixelated", filter: "brightness(0.3)"}}
        />
      </div>
    )
  }

  function PokemonForm() {
    return (
      <div className="grid place-items-center h-screen">
        <div>
          {(wildPokemon !== undefined) && (
            <div className="w-80 h-64 m-auto">
              <div className="text-lg text-center font-medium">
                You caught a {PokemonUtils.displayName(wildPokemon.name)}!
              </div>
              <div className="w-80 h-40">
                <img 
                  className="h-20 scale-[3] object-none object-cover object-bottom m-auto"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${wildPokemon.id}.gif`}
                  alt={"test"}
                  style={{imageRendering: "pixelated"}}
                />
              </div>
              <div className="text-lg text-center font-medium">
                Would you like to give it a name?
              </div>
            </div>
          )}
          <div>
            <input
              className="mr-4 w-64 h-16 text-lg font-medium bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              value={pokemonName}
              onChange={e => setPokemonName(e.target.value)}
              />
            <button
              className="w-48 h-16 text-lg text-center font-medium bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handlePostPokemon}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}