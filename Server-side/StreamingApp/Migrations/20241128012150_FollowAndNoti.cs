using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class FollowAndNoti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$9fyi5UydmZvjQcgB19NlY.VnXtY8zNWGoiIa4vxN/P76lhZjdxNO6");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$YJeQn4Eph1InJRvRCU.J1.frv8rOokdZOdBYhjCJ8D2MvYvKmfGni");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$Rl0ic8CZ4U0cZR5.ZWz5UeZ/VyGTPnyMbnWQqU/1LxGybvFfnDQPS");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$klIzSAHATZaG9GYblIf4u.8kc7f71KpB/NdsoooH1.I.poKkRCcHu");
        }
    }
}
