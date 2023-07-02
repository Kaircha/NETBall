using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using NetBallAPI.Data;
using NetBallAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<NetBallDbContext>();

builder.Services.AddScoped<TrainerService>();
builder.Services.AddScoped<PokemonService>();
builder.Services.AddScoped<BoxService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.MapControllers();
app.CreateDatabase();

app.Run();