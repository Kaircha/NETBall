using NetBallAPI.Models;
using NetBallAPI.Data;
using Microsoft.EntityFrameworkCore;
using NetBallAPI.Exceptions;

namespace NetBallAPI.Services;

public class TrainerService {
  protected readonly NetBallDbContext Context;

  public TrainerService(NetBallDbContext context) {
    Context = context;
  }

  public IEnumerable<Trainer> GetAll() {
    List<Trainer> trainers = Context.Trainers.ToList();

    foreach (Trainer trainer in trainers) {
      trainer.CaughtPokemon = Context.Pokemons.Where(p => p.CatcherId == trainer.Id).ToList();
      trainer.OwnedPokemon = Context.Pokemons.Where(p => p.OwnerId == trainer.Id).ToList();
    }

    return trainers;
  }

  public async Task<Trainer?> GetById(int id) {
    Trainer? trainer = await Context.Trainers.FindAsync(id) ?? throw new DataNotFoundException(nameof(Trainer), id);

    trainer.CaughtPokemon = Context.Pokemons.Where(p => p.CatcherId == trainer.Id).ToList();
    trainer.OwnedPokemon = Context.Pokemons.Where(p => p.OwnerId == trainer.Id).ToList();

    return trainer;
  }

  public async Task<Trainer> Create(Trainer newTrainer) {
    Context.Trainers.Add(newTrainer);
    await Context.SaveChangesAsync();

    return newTrainer;
  }

  public async Task<Trainer?> UpdateName(int id, string newName) {
    Trainer? trainer = await Context.Trainers.FindAsync(id) ?? throw new DataNotFoundException(nameof(Trainer), id);
    trainer.Name = newName;
    await Context.SaveChangesAsync();

    return trainer;
  }

  public async Task DeleteById(int id) {
    Trainer? trainer = await Context.Trainers.FindAsync(id) ?? throw new DataNotFoundException(nameof(Trainer), id);
    Context.Trainers.Remove(trainer);
    await Context.SaveChangesAsync();
  }
}