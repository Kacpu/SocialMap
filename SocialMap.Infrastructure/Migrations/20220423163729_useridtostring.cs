using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class useridtostring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AppUsers_AppUserId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_AppUsers_AppUserId",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI");

            migrationBuilder.DropForeignKey(
                name: "FK_POIAccess_AppUsers_AppUserId",
                table: "POIAccess");

            migrationBuilder.DropTable(
                name: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_POIAccess_AppUserId",
                table: "POIAccess");

            migrationBuilder.DropIndex(
                name: "IX_POI_AppUserId",
                table: "POI");

            migrationBuilder.DropIndex(
                name: "IX_Likes_AppUserId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Comments_AppUserId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "POIAccess");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "POI");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "IsAccepted",
                table: "POIAccess",
                newName: "IsAccpeted");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAccpeted",
                table: "POIAccess",
                newName: "IsAccepted");

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "POIAccess",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "POI",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Likes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AppUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserfrontId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUsers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_POIAccess_AppUserId",
                table: "POIAccess",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_POI_AppUserId",
                table: "POI",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_AppUserId",
                table: "Likes",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AppUserId",
                table: "Comments",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AppUsers_AppUserId",
                table: "Comments",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_AppUsers_AppUserId",
                table: "Likes",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_POIAccess_AppUsers_AppUserId",
                table: "POIAccess",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
