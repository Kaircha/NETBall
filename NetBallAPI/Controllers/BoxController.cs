using Microsoft.AspNetCore.Mvc;
using NetBallAPI.Services;
using NetBallAPI.Exceptions;

namespace NetBallAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class BoxController : ControllerBase {
  readonly BoxService BoxService;

  public BoxController(BoxService service) {
    BoxService = service;
  }

  [HttpPut("gift")]
  public async Task<ActionResult> GiftPokemon(int pokemonId, int senderId, int receiverId) {
    if (pokemonId <= 0) return BadRequest($"{nameof(pokemonId)} should be greater than zero.");
    if (senderId <= 0) return BadRequest($"{nameof(senderId)} should be greater than zero.");
    if (receiverId <= 0) return BadRequest($"{nameof(receiverId)} should be greater than zero.");
    try {
      await BoxService.GiftPokemon(pokemonId, senderId, receiverId);
      return Ok();
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    } catch (PokemonNotOwnedException ex) {
      return Unauthorized($"Trainer Id {ex.NotOwnerId} does not own Pokemon Id {ex.PokemonId}.");
    }
  }

  [HttpPut("trade")]
  public async Task<ActionResult> TradePokemon(int pokemonAId, int pokemonBId, int trainerAId, int trainerBId) {
    if (pokemonAId <= 0) return BadRequest($"{nameof(pokemonAId)} should be greater than zero.");
    if (pokemonBId <= 0) return BadRequest($"{nameof(pokemonBId)} should be greater than zero.");
    if (trainerAId <= 0) return BadRequest($"{nameof(trainerAId)} should be greater than zero.");
    if (trainerBId <= 0) return BadRequest($"{nameof(trainerBId)} should be greater than zero.");
    try {
      await BoxService.TradePokemon(pokemonAId, pokemonBId, trainerAId, trainerBId);
      return Ok();
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    } catch (PokemonNotOwnedException ex) {
      return Unauthorized($"Trainer Id {ex.NotOwnerId} does not own Pokemon Id {ex.PokemonId}.");
    }
  }
} 