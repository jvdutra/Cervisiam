using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class test : Migration
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
                name: "business",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    userId = table.Column<int>(nullable: false),
                    cnpj = table.Column<string>(nullable: true),
                    uf = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    latitude = table.Column<double>(nullable: false),
                    longitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_business", x => x.id);
                    table.ForeignKey(
                        name: "FK_business_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "coupons",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    businessId = table.Column<int>(nullable: false),
                    type = table.Column<string>(nullable: true),
                    value = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coupons", x => x.id);
                    table.ForeignKey(
                        name: "FK_coupons_business_businessId",
                        column: x => x.businessId,
                        principalTable: "business",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    businessId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.id);
                    table.ForeignKey(
                        name: "FK_products_business_businessId",
                        column: x => x.businessId,
                        principalTable: "business",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "couponClients",
                columns: table => new
                {
                    couponID = table.Column<int>(nullable: false),
                    userID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_couponClients", x => new { x.couponID, x.userID });
                    table.ForeignKey(
                        name: "FK_couponClients_coupons_couponID",
                        column: x => x.couponID,
                        principalTable: "coupons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_couponClients_users_userID",
                        column: x => x.userID,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_business_userId",
                table: "business",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_couponClients_userID",
                table: "couponClients",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_coupons_businessId",
                table: "coupons",
                column: "businessId");

            migrationBuilder.CreateIndex(
                name: "IX_products_businessId",
                table: "products",
                column: "businessId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "couponClients");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "coupons");

            migrationBuilder.DropTable(
                name: "business");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
