using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class add_new_app_user3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI");

            migrationBuilder.DropForeignKey(
                name: "FK_POI_Category_CategoryId",
                table: "POI");

            migrationBuilder.DropColumn(
                name: "xxx",
                table: "POI");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "POI",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "POI",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_POI_Category_CategoryId",
                table: "POI",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI");

            migrationBuilder.DropForeignKey(
                name: "FK_POI_Category_CategoryId",
                table: "POI");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "POI",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "POI",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "xxx",
                table: "POI",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_POI_AppUsers_AppUserId",
                table: "POI",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_POI_Category_CategoryId",
                table: "POI",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
