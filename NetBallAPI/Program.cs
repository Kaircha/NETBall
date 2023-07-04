using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using NetBallAPI.Data;
using NetBallAPI.Services;
using Microsoft.AspNetCore.SpaServices.Extensions;

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

builder.Services.AddCors();
builder.Services.AddMvc();

builder.Services.AddSpaStaticFiles(configuration => configuration.RootPath = "frontend/dist");


var app = builder.Build();
app.UsePathBase(new PathString("/api"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseCors(builder => builder.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader());

  //app.UseSpa(spa => {
  //  spa.UseProxyToSpaDevelopmentServer("http://localhost:8085");
  //});
}

app.CreateDatabase();
app.UseRouting();
app.MapControllers();

app.Run();