using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class StreamStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StreamStatus",
                table: "Streams",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StreamStatus",
                table: "Streams");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$F6ZL5Gntu7xtRBPWRqEZ9.JLITRsXUfLUUffy6WsY3LxQd7uCAs8.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$WMOBU6r4LZVAcyb5i4pOEe8.mIqtxM/ppp1k1Q0fkreIM0tAPNLuO");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$dya.wZkI9L0RYpD0mOeT9ukpcj3lshVN0cUW09GktKU5P21Jtyzcq");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$eGR4gqrOX.8HMOD3YZVFSuj1.7xqplLMca6KRJ8MXiHA8tuhQchWm");
        }
    }
}
