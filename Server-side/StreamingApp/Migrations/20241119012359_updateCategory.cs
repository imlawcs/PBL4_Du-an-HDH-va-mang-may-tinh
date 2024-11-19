using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class updateCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$Oc31NgNb80XOMneqDAI8NuSPYpv8H1HIPGcXum6T0I05CJwPBhhui");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$3GOMRRlz/Cu4etnTpbgmCe96FfA1DSUY7sramNin2MyQZmORvErHm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$ouNbSxmH5U2EKvbGNY6egevrF2pyS.0pEikbn0NiWNWoHfDYRcwqS");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$r7dy9XU9ETCtevQnzUDgLOAIIIjNHACLd13Peh42aL6XfIsmhz7ri");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$ZmRWxjS9jW5OQSzO48hLQO7jEN2o94RVqzOOPZx48wD9L8sfYEBtu");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$hq6cgrlF/qqY4rJIbCJgyOozOmGpRReN3Dm7M5iUDCh/KtTmXms1y");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$KS3WDPPJ0Zw4pNZWBa.3Vuosj8utwAymYriD2sVaJQ78Fw3/OkNy6");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$xBy/RN.Z/muuz4pM3DisUuSMc.3nNhsvfaMKo2.47A8zK.6zyjZpG");
        }
    }
}
