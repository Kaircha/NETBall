namespace NetBallAPI.Exceptions;

public class DataNotFoundException : Exception {
  public string Entity { get; init; }
  public int Id { get; init; }

  public DataNotFoundException(string entity, int id) {
    Entity = entity;
    Id = id;
  }
}