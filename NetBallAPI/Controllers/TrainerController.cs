using Microsoft.AspNetCore.Mvc;
using NetBallAPI.Services;
using NetBallAPI.Models;
using NetBallAPI.Exceptions;

namespace NetBallAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class TrainerController : ControllerBase {
  readonly TrainerService TrainerService;

  public TrainerController(TrainerService service) {
    TrainerService = service;
  }

  [HttpGet]
  public IEnumerable<Trainer> GetAll() => TrainerService.GetAll();

  [HttpGet("{id}")]
  public async Task<ActionResult<Trainer>> Get(int id) {
    if (id <= 0) return BadRequest($"{nameof(id)} should be greater than zero.");
    try {
      Trainer? trainer = await TrainerService.GetById(id);
      return Ok(trainer);
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    }
  }

  [HttpPost]
  public async Task<IActionResult> Create(Trainer newTrainer) {
    var trainer = await TrainerService.Create(newTrainer);
    return CreatedAtAction(nameof(TrainerService.Create), new { id = trainer.Id }, trainer);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(int id) {
    if (id <= 0) return BadRequest($"{nameof(id)} should be greater than zero.");
    try {
      await TrainerService.DeleteById(id);
      return Ok();
    } catch (DataNotFoundException ex) {
      return NotFound($"{ex.Entity} was not found for Id {ex.Id}.");
    }
  }
}