using Microsoft.AspNetCore.Mvc;
using NetBallAPI.Services;
using NetBallAPI.Models;
using NetBallAPI.Exceptions;

namespace NetBallAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class PokemonController : ControllerBase {
  readonly PokemonService PokemonService;

  public PokemonController(PokemonService service) {
    PokemonService = service;
  }

  [HttpGet]
  public IEnumerable<Pokemon> GetAll() => PokemonService.GetAll();

  [HttpGet("{id}")]
  public async Task<ActionResult<Pokemon>> Get(int id) {
    if (id <= 0) return BadRequest($"{nameof(id)} should be greater than zero.");
    try {
      Pokemon? pokemon = await PokemonService.GetById(id);
      return Ok(pokemon);
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    }
  }

  [HttpPost]
  public async Task<IActionResult> Create(Pokemon newPokemon) {
    if (newPokemon.Dex == 855) return StatusCode(418); // Actually the wrong use of this
    var pokemon = await PokemonService.Create(newPokemon);
    return CreatedAtAction(nameof(PokemonService.Create), new { id = pokemon.Id }, pokemon);
  }

  [HttpPut("rename")]
  public async Task<IActionResult> Rename(int id, string newName) {
    if (id <= 0) return BadRequest($"{nameof(id)} should be greater than zero.");
    try {
      await PokemonService.UpdateName(id, newName);
      return Ok();
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    }
  }

  [HttpDelete("{id}")] // With Service.Delete taking a trainer
  public async Task<ActionResult> Delete(int id) {
    if (id <= 0) return BadRequest($"{nameof(id)} should be greater than zero.");
    try {
      await PokemonService.DeleteById(id);
      return Ok();
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    }
  }
}