using Microsoft.EntityFrameworkCore;
using NetBallAPI.Models;

namespace NetBallAPI.Data; 

public class NetBallDbContext : DbContext {
  protected readonly IConfiguration Configuration;

  public NetBallDbContext(IConfiguration configuration) {
    Configuration = configuration;
  }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    optionsBuilder.UseNpgsql(Configuration.GetConnectionString("NetBallDatabase"));
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    modelBuilder.Entity<Pokemon>().HasOne(t => t.Catcher).WithMany(p => p.CaughtPokemon).HasForeignKey(k => k.CatcherId);
    modelBuilder.Entity<Pokemon>().HasOne(t => t.Owner).WithMany(p => p.OwnedPokemon).HasForeignKey(k => k.OwnerId);
  }

  public DbSet<Trainer> Trainers => Set<Trainer>();
  public DbSet<Pokemon> Pokemons => Set<Pokemon>();
}