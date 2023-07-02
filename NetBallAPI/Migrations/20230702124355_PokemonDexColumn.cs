using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NetBallAPI.Migrations
{
    /// <inheritdoc />
    public partial class PokemonDexColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Trainers_TrainerId",
                table: "Pokemons");

            migrationBuilder.RenameColumn(
                name: "TrainerId",
                table: "Pokemons",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Pokemons_TrainerId",
                table: "Pokemons",
                newName: "IX_Pokemons_OwnerId");

            migrationBuilder.AddColumn<long>(
                name: "Dex",
                table: "Pokemons",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Trainers_OwnerId",
                table: "Pokemons",
                column: "OwnerId",
                principalTable: "Trainers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Trainers_OwnerId",
                table: "Pokemons");

            migrationBuilder.DropColumn(
                name: "Dex",
                table: "Pokemons");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Pokemons",
                newName: "TrainerId");

            migrationBuilder.RenameIndex(
                name: "IX_Pokemons_OwnerId",
                table: "Pokemons",
                newName: "IX_Pokemons_TrainerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Trainers_TrainerId",
                table: "Pokemons",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "Id");
        }
    }
}
