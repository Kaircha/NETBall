using System.ComponentModel.DataAnnotations;

namespace NetBallAPI.Models; 

public class Trainer {
  public int Id { get; set; } // Defaults to Primary Key
  [MaxLength(20)] public required string Name { get; set; }
  public int Money { get; set; }
  public List<Pokemon>? CaughtPokemon { get; set; }
  public List<Pokemon>? OwnedPokemon { get; set; }
}