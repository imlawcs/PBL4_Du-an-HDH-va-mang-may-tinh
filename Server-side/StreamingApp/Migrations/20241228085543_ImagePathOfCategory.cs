using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class ImagePathOfCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$MQJojxYT.8pRiNsjylsWbeHLodWgxHsaiYrKAwniE3g0Rgp/uk.Ji");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$jc2QmA0eVq/WjxO.5dPNpO0QaoSo7rftdd1Z34mM/H4ZnEIwgtmy2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$WF39bN99xouEPivadaXLI.W/2aEPER0jDz.VwQ4W8WgalSx88zImC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$GN4UNYb/Ye.6lH5/rdg9KOxEgPKz0fHXimYGA27OrNPyhmVzfkSQC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Categories");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$g9pN87CcGIp/HAdre73c4uGi.HtuL4lwxehKLD5SJ1gqetwoOjncm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$wLRfB6CnaPMeBAcRSjlikutWdTj0MBOMrqvdbPB5qXRB3y8ZpzYA.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$ZklyDXi2x8lBbhHLJkFGRuN4gOz4jqcp31ZJvdiUW84m6qcnJsiIC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$A/1DMADK9TmFtQBfCakHU.JFNSiRsC.YUlj8nYW.vQgy8W7DtFHre");
        }
    }
}
