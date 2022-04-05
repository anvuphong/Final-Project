using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OAM_Backend.Migrations
{
    public partial class LocalCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$.ehx38uQ1Oh/datjcJFc.Onup36yuj1HOBtHQ7kVDm7ahopi8TjOu");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$tQk2novGfnKObE1xzUdaJuxADdU/7XBGmBBEBqFIIOfyinIOdIg7K");
        }
    }
}
