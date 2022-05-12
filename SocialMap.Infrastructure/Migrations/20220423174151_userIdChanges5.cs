using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class userIdChanges5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_POIAccess_AppUserId",
                table: "POIAccess",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_AppUserId",
                table: "Likes",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_AppUsers_AppUserId",
                table: "Likes",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_POIAccess_AppUsers_AppUserId",
                table: "POIAccess",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_AppUsers_AppUserId",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_POIAccess_AppUsers_AppUserId",
                table: "POIAccess");

            migrationBuilder.DropIndex(
                name: "IX_POIAccess_AppUserId",
                table: "POIAccess");

            migrationBuilder.DropIndex(
                name: "IX_Likes_AppUserId",
                table: "Likes");
        }
    }
}
