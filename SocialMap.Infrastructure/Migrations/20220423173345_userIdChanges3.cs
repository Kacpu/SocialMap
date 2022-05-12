using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class userIdChanges3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AppUsers_AppUserId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI");

            migrationBuilder.DropTable(
                name: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_POI_AppUserId",
                table: "POI");

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
                name: "IsAccpeted",
                table: "POIAccess",
                newName: "IsAccepted");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAccepted",
                table: "POIAccess",
                newName: "IsAccpeted");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "POIAccess",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "POI",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Likes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "AppUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserfrontId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUsers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_POI_AppUserId",
                table: "POI",
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
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id");
        }
    }
}
