using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Migrations
{
    /// <inheritdoc />
    public partial class deleteColImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$CL.zpc2J/PxhCcRHMeyzD.oFA1gIt.DKvMfLcrLCOa2OaNOY4HU9e");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$i70fY42UT0mou8qJjEvEhuKAtI2G.z2tZj9x8735AAfhScPK.Gsmy");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$GV5I0ol9hH3I.Nl8BvzZYOHx68OKc6x0LR.TZp3/Fiommp0Vxiede");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "Password",
                value: "$2a$11$5sz7f0oZkGe5pEw/7t0cseZ4Tk34Lu6XIXn4V8UVGuKYcBCup3mD6");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Users",
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
    }
}
