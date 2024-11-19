using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class updateBio1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$eDUbw0libj2P.qt6XpVLL.Odd7DcSS/SfnN9hvPA.PDNm6FJWnovq");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$2VnxfrrnJXdwFnooz.BgcOzj4ewVbNkidaEIGkiZg.6HandEnnUMC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$ynuArKiwxY83yogxTivRa.FXLwKT996xORw1e4bmg3nr.Hwj3AIgq");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$tMjgGxMXIOuqHWx9DNnuQu2uVdDV7iwlWed5Akx4ExxOf47OtMXni");
        }
    }
}
