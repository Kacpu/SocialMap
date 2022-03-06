using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialMap.Infrastructure.Migrations
{
    public partial class comments_likes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_AspNetUsers_AppUserId1",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_POI_POIId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_AspNetUsers_AppUserId1",
                table: "Like");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_POI_POIId",
                table: "Like");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Like",
                table: "Like");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comment",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "Like",
                newName: "Likes");

            migrationBuilder.RenameTable(
                name: "Comment",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_Like_POIId",
                table: "Likes",
                newName: "IX_Likes_POIId");

            migrationBuilder.RenameIndex(
                name: "IX_Like_AppUserId1",
                table: "Likes",
                newName: "IX_Likes_AppUserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_POIId",
                table: "Comments",
                newName: "IX_Comments_POIId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_AppUserId1",
                table: "Comments",
                newName: "IX_Comments_AppUserId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                table: "Likes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "POIAccess",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    POIId = table.Column<int>(type: "int", nullable: false),
                    AppUserId = table.Column<int>(type: "int", nullable: false),
                    IsAccpeted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_POIAccess", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AspNetUsers_AppUserId1",
                table: "Comments",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_POI_POIId",
                table: "Comments",
                column: "POIId",
                principalTable: "POI",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_AspNetUsers_AppUserId1",
                table: "Likes",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_POI_POIId",
                table: "Likes",
                column: "POIId",
                principalTable: "POI",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AspNetUsers_AppUserId1",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_POI_POIId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_AspNetUsers_AppUserId1",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_POI_POIId",
                table: "Likes");

            migrationBuilder.DropTable(
                name: "POIAccess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                table: "Likes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Likes",
                newName: "Like");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "Comment");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_POIId",
                table: "Like",
                newName: "IX_Like_POIId");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_AppUserId1",
                table: "Like",
                newName: "IX_Like_AppUserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_POIId",
                table: "Comment",
                newName: "IX_Comment_POIId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_AppUserId1",
                table: "Comment",
                newName: "IX_Comment_AppUserId1");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Like",
                table: "Like",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comment",
                table: "Comment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_AspNetUsers_AppUserId1",
                table: "Comment",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_POI_POIId",
                table: "Comment",
                column: "POIId",
                principalTable: "POI",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Like_AspNetUsers_AppUserId1",
                table: "Like",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Like_POI_POIId",
                table: "Like",
                column: "POIId",
                principalTable: "POI",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
