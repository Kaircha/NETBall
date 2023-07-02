namespace NetBallAPI.Data;

public static class Extensions {
  public static void CreateDatabase(this IHost host) {
    using var scope = host.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<NetBallDbContext>();
    context.Database.EnsureCreated();
  }
}