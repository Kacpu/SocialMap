using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class addedForeignKeysForPOIAccess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "POIAccess",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_POIAccess_AppUserId",
                table: "POIAccess",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_POIAccess_POIId",
                table: "POIAccess",
                column: "POIId");

            migrationBuilder.AddForeignKey(
                name: "FK_POIAccess_AspNetUsers_AppUserId",
                table: "POIAccess",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_POIAccess_POI_POIId",
                table: "POIAccess",
                column: "POIId",
                principalTable: "POI",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_POIAccess_AspNetUsers_AppUserId",
                table: "POIAccess");

            migrationBuilder.DropForeignKey(
                name: "FK_POIAccess_POI_POIId",
                table: "POIAccess");

            migrationBuilder.DropIndex(
                name: "IX_POIAccess_AppUserId",
                table: "POIAccess");

            migrationBuilder.DropIndex(
                name: "IX_POIAccess_POIId",
                table: "POIAccess");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "POIAccess",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
