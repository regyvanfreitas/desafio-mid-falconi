import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
