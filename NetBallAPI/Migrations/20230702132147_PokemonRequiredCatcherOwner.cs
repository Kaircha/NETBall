using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NetBallAPI.Migrations
{
    /// <inheritdoc />
    public partial class PokemonRequiredCatcherOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Trainers_CatcherId",
                table: "Pokemons");

            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Trainers_OwnerId",
                table: "Pokemons");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Pokemons",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CatcherId",
                table: "Pokemons",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Trainers_CatcherId",
                table: "Pokemons",
                column: "CatcherId",
                principalTable: "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Trainers_OwnerId",
                table: "Pokemons",
                column: "OwnerId",
                principalTable: "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Trainers_CatcherId",
                table: "Pokemons");

            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Trainers_OwnerId",
                table: "Pokemons");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Pokemons",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CatcherId",
                table: "Pokemons",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Trainers_CatcherId",
                table: "Pokemons",
                column: "CatcherId",
                principalTable: "Trainers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Trainers_OwnerId",
                table: "Pokemons",
                column: "OwnerId",
                principalTable: "Trainers",
                principalColumn: "Id");
        }
    }
}
