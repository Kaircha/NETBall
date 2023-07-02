export type Pokemon = {
  id: number;
  dex: number;
  name: string;
  catcherId: number;
  ownerId: number;
}

export function renderPokemon(pokemon: Pokemon) {
  return(
    <div key={pokemon.id} className="pokemon"> 
      <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + pokemon.dex + ".gif"} alt={pokemon.dex.toString()}/>
      <div>
        {pokemon.name != null && pokemon.name}
      </div>
    </div>
  )
}