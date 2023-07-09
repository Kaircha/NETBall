using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace NetBallAPI.Models;

public class Pokemon {
  public int Id { get; set; } // Defaults to Primary Key
  public required int Dex { get; set; } // PokéAPI External Key
  [MaxLength(20)] public string? Name { get; set; }

  public required int CatcherId { get; set; }
  [JsonIgnore] public Trainer? Catcher { get; set; }

  public required int OwnerId { get; set; }
  [JsonIgnore] public Trainer? Owner { get; set; }
}