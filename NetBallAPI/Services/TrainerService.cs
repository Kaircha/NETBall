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

  public IEnumerable<Trainer> GetAll() => Context.Trainers.AsNoTracking().ToList();

  public async Task<Trainer?> GetById(int id) => await Context.Trainers.FindAsync(id) ?? throw new DataNotFoundException(nameof(Trainer), id);

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