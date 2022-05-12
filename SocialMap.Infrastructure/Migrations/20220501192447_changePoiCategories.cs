using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class changePoiCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_POI_Category_CategoryId",
                table: "POI");

            migrationBuilder.DropIndex(
                name: "IX_POI_CategoryId",
                table: "POI");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "POI");

            migrationBuilder.CreateTable(
                name: "CategoryPOI",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "int", nullable: false),
                    POIsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryPOI", x => new { x.CategoriesId, x.POIsId });
                    table.ForeignKey(
                        name: "FK_CategoryPOI_Category_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryPOI_POI_POIsId",
                        column: x => x.POIsId,
                        principalTable: "POI",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryPOI_POIsId",
                table: "CategoryPOI",
                column: "POIsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryPOI");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "POI",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_POI_CategoryId",
                table: "POI",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_POI_Category_CategoryId",
                table: "POI",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
