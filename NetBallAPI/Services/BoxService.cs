using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetBallAPI.Data;
using NetBallAPI.Exceptions;
using NetBallAPI.Models;
using System.Reflection;

namespace NetBallAPI.Services; 

public class BoxService {
  protected readonly NetBallDbContext Context;

  public BoxService(NetBallDbContext context) {
    Context = context;
  }

  public async Task GiftPokemon(int pokemonId, int senderId, int receiverId) {
    Pokemon pokemon = await Context.Pokemons.FindAsync(pokemonId) ?? throw new DataNotFoundException(nameof(Pokemon), pokemonId);
    Trainer sender = await Context.Trainers.FindAsync(senderId) ?? throw new DataNotFoundException(nameof(Trainer), senderId);
    Trainer receiver = await Context.Trainers.FindAsync(receiverId) ?? throw new DataNotFoundException(nameof(Trainer), receiverId);

    if (sender.OwnedPokemon == null || !sender.OwnedPokemon.Contains(pokemon)) throw new PokemonNotOwnedException(sender.Id, pokemon.Id);

    pokemon.OwnerId = receiver.Id;

    await Context.SaveChangesAsync();
  }

  public async Task TradePokemon(int pokemonAId, int pokemonBId, int trainerAId, int trainerBId) {
    Pokemon pokemonA = await Context.Pokemons.FindAsync(pokemonAId) ?? throw new DataNotFoundException(nameof(Pokemon), pokemonAId);
    Pokemon pokemonB = await Context.Pokemons.FindAsync(pokemonBId) ?? throw new DataNotFoundException(nameof(Pokemon), pokemonBId);
    Trainer trainerA = await Context.Trainers.FindAsync(trainerAId) ?? throw new DataNotFoundException(nameof(Trainer), trainerAId);
    Trainer trainerB = await Context.Trainers.FindAsync(trainerBId) ?? throw new DataNotFoundException(nameof(Trainer), trainerBId);
    
    if (trainerA.OwnedPokemon == null || !trainerA.OwnedPokemon.Contains(pokemonA)) throw new PokemonNotOwnedException(trainerA.Id, pokemonA.Id);
    if (trainerB.OwnedPokemon == null || !trainerB.OwnedPokemon.Contains(pokemonB)) throw new PokemonNotOwnedException(trainerB.Id, pokemonB.Id);
    
    pokemonA.OwnerId = trainerB.Id;
    pokemonB.OwnerId = trainerA.Id;

    await Context.SaveChangesAsync();
  }
}