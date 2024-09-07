import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty({
    example: "24e592f9-cd7d-4c5c-96e1-fb0d2eafd8b8",
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    example: "johan@gmail.com",
    uniqueItems: true,
  })
  email: string;

  constructor() {
    this.id = "";
    this.email = "";
  }
}
