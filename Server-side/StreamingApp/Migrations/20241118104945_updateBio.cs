using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class updateBio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$bJofIH.GvuqUrG9M/4P97OUTajXVLtWAu0rrJzp5/8bIwNCdY4yw.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$.tN.DuN2./elqSMRchtWZeCt93ovfJQgSRrqHEPzqkLD9KpjMwp22");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$o5Wdw9jor0d2URi7JGRtF.EFv7owQUTrdKv/GE5oJiArUZBvHPzOK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$D16xD3Ut6AB2XSKB9E30F.VJHzsmLZcLyCxeaCDKUSK6SCGmEYRIC");
        }
    }
}
