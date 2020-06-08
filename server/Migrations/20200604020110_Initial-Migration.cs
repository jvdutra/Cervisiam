using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    cpf = table.Column<string>(nullable: true),
                    dateOfBirth = table.Column<string>(nullable: true),
                    administrator = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Business",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(nullable: false),
                    cnpj = table.Column<string>(nullable: true),
                    uf = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    latitude = table.Column<double>(nullable: false),
                    longitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Business", x => x.id);
                    table.ForeignKey(
                        name: "FK_Business_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Coupon",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    businessId = table.Column<int>(nullable: false),
                    type = table.Column<string>(nullable: true),
                    value = table.Column<double>(nullable: false),
                    Userid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupon", x => x.id);
                    table.ForeignKey(
                        name: "FK_Coupon_users_Userid",
                        column: x => x.Userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Business_userId",
                table: "Business",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Coupon_Userid",
                table: "Coupon",
                column: "Userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Business");

            migrationBuilder.DropTable(
                name: "Coupon");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
