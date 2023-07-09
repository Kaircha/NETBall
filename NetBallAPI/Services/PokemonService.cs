using Microsoft.EntityFrameworkCore;
using NetBallAPI.Data;
using NetBallAPI.Exceptions;
using NetBallAPI.Models;

namespace NetBallAPI.Services;

public class PokemonService {
  protected readonly NetBallDbContext Context;

  public PokemonService(NetBallDbContext context) {
    Context = context;
  }

  public IEnumerable<Pokemon> GetAll() => Context.Pokemons.AsNoTracking().ToList();

  public async Task<Pokemon?> GetById(int id) => await Context.Pokemons.FindAsync(id) ?? throw new DataNotFoundException(nameof(Pokemon), id);
  public async Task<Pokemon?> GetByOwnerId(int ownerId) => await Context.Pokemons.AsNoTracking().SingleOrDefaultAsync(p => p.OwnerId == ownerId) ?? throw new DataNotFoundException(nameof(Pokemon), ownerId);
  public async Task<Pokemon?> GetByCatcherId(int catcherId) => await Context.Pokemons.AsNoTracking().SingleOrDefaultAsync(p => p.CatcherId == catcherId) ?? throw new DataNotFoundException(nameof(Pokemon), catcherId);

  public async Task<Pokemon> Create(Pokemon newPokemon) {
    if (string.IsNullOrEmpty(newPokemon.Name)) newPokemon.Name = null;
    Context.Pokemons.Add(newPokemon);
    await Context.SaveChangesAsync();

    return newPokemon;
  }

  public async Task<Pokemon?> UpdateName(int id, string newName) {
    Pokemon? pokemon = await Context.Pokemons.FindAsync(id) ?? throw new DataNotFoundException(nameof(Pokemon), id);
    pokemon.Name = newName;
    await Context.SaveChangesAsync();

    return pokemon;
  }

  public async Task DeleteById(int id) {
    Pokemon? pokemon = await Context.Pokemons.FindAsync(id) ?? throw new DataNotFoundException(nameof(Pokemon), id);
    Context.Pokemons.Remove(pokemon);
    await Context.SaveChangesAsync();
  }
}