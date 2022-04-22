using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class add_new_app_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "xxx",
                table: "POIAccess",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "xxx",
                table: "POI",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "xxx",
                table: "Likes",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "xxx",
                table: "Comments",
                newName: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "POIAccess",
                newName: "xxx");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "POI",
                newName: "xxx");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Likes",
                newName: "xxx");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Comments",
                newName: "xxx");
        }
    }
}
