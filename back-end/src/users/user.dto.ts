import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'João',
    minLength: 1,
  })
  @IsString({ message: 'Primeiro nome deve ser uma string' })
  @IsNotEmpty({ message: 'Primeiro nome é obrigatório' })
  firstName: string;

  @ApiProperty({
    description: 'Último nome do usuário',
    example: 'Silva',
    minLength: 1,
  })
  @IsString({ message: 'Último nome deve ser uma string' })
  @IsNotEmpty({ message: 'Último nome é obrigatório' })
  lastName: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joao.silva@email.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  email: string;

  @ApiProperty({
    description: 'ID do perfil associado ao usuário',
    example: '1',
  })
  @IsString({ message: 'ID do perfil deve ser uma string' })
  @IsNotEmpty({ message: 'ID do perfil é obrigatório' })
  profileId: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Primeiro nome do usuário',
    example: 'Pedro',
  })
  @IsString({ message: 'Primeiro nome deve ser uma string' })
  @IsNotEmpty({ message: 'Primeiro nome não pode estar vazio' })
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Último nome do usuário',
    example: 'Santos',
  })
  @IsString({ message: 'Último nome deve ser uma string' })
  @IsNotEmpty({ message: 'Último nome não pode estar vazio' })
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Endereço de e-mail do usuário',
    example: 'pedro.santos@email.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Status de ativação do usuário',
    example: true,
  })
  @IsBoolean({ message: 'Status ativo deve ser verdadeiro ou falso' })
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'ID do perfil associado ao usuário',
    example: '2',
  })
  @IsString({ message: 'ID do perfil deve ser uma string' })
  @IsNotEmpty({ message: 'ID do perfil não pode estar vazio' })
  @IsOptional()
  profileId?: string;
}

export class UpdateUserStatusDto {
  @ApiProperty({
    description: 'Novo status de ativação do usuário',
    example: false,
  })
  @IsBoolean({ message: 'Status ativo deve ser verdadeiro ou falso' })
  isActive: boolean;
}
