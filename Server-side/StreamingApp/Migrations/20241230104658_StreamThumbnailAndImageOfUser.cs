using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class StreamThumbnailAndImageOfUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StreamThumbnail",
                table: "Streams",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "ImagePath", "Password" },
                values: new object[] { null, "$2a$11$HQ80EkHI7zvdHSWc7m1LfOCrIXWxh8ZuYw3u/Mq53WRW3EIfy0fwe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "ImagePath", "Password" },
                values: new object[] { null, "$2a$11$QzivzNloNkLvLlZZM.ZaY.V21fT2QRbBFC9useUo4ZENF6Egdl/Nq" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "ImagePath", "Password" },
                values: new object[] { null, "$2a$11$oAk69aM09Kjr5y7k/sdOpup7fUqvTtQVTfq6YPvSwy.RQGp8hCSDC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                columns: new[] { "ImagePath", "Password" },
                values: new object[] { null, "$2a$11$m6jOc1sTt93H4.HNmnHPqO3qZhm2ZWWjW9FVXe0IybBB2dF9r2oWi" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StreamThumbnail",
                table: "Streams");

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
    }
}
