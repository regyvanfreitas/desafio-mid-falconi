import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Administrador',
    minLength: 1,
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;
}

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Novo nome do perfil',
    example: 'Super Administrador',
    minLength: 1,
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;
}
