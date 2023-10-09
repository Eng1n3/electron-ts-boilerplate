import { IsString, IsUUID } from "class-validator";

export class ContactImageDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  filename: string;

  @IsString()
  originalName: string;

  @IsString()
  mimeType: string;

  @IsString()
  createdAt?: Date;

  @IsString()
  updatedAt?: Date;

  @IsString()
  deletedAt?: Date;
}

export class ContactDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: number;

  @IsString()
  image: ContactImageDto;

  @IsString()
  gender: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;

  @IsString()
  deletedAt: Date;
}
