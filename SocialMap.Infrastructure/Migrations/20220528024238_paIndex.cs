using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class paIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_POIAccess_POIId",
                table: "POIAccess");

            migrationBuilder.CreateIndex(
                name: "IX_POIAccess_POIId_AppUserId",
                table: "POIAccess",
                columns: new[] { "POIId", "AppUserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_POIAccess_POIId_AppUserId",
                table: "POIAccess");

            migrationBuilder.CreateIndex(
                name: "IX_POIAccess_POIId",
                table: "POIAccess",
                column: "POIId");
        }
    }
}
