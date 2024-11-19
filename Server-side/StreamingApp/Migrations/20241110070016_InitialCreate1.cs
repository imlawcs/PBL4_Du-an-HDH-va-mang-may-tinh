using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$Nv2wnP//LvYKrM15k7L5aeeLWbd22FNETz4S1CVmCfSkYBZiCmb1e");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$vgdwYNRlcq1vBtDBBMF7PeuRrrHpkmA9.H.E0Xv3YRE/j33jMCw42");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$AWbblPXxlniN/BArZPcWOO0HfUS8MN6ai8XZW5Szmf5dQm6QJql7q");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$Ax0wmrxAdKoPZuqGWe.p6O1b7cbnBpahc2.l4xYsS8KdWYR4hBKfq");
        }
    }
}
