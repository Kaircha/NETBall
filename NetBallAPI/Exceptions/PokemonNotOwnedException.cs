namespace NetBallAPI.Exceptions; 

public class PokemonNotOwnedException : Exception {
  public int NotOwnerId { get; init; }
  public int PokemonId { get; init; }

  public PokemonNotOwnedException(int notOwnerId, int pokemonId) {
    NotOwnerId = notOwnerId;
    PokemonId = pokemonId;
  }
}
