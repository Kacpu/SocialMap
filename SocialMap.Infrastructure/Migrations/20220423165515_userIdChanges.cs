using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class userIdChanges : Migration
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "POIAccess",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "POI",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Likes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: true);

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
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_AppUsers_AppUserId",
                table: "Likes",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
                onDelete: ReferentialAction.Restrict);
        }
    }
}
