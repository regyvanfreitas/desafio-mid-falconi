import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Primeiro nome deve ser uma string' })
  @IsNotEmpty({ message: 'Primeiro nome é obrigatório' })
  firstName: string;

  @IsString({ message: 'Último nome deve ser uma string' })
  @IsNotEmpty({ message: 'Último nome é obrigatório' })
  lastName: string;

  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  email: string;

  @IsString({ message: 'ID do perfil deve ser uma string' })
  @IsNotEmpty({ message: 'ID do perfil é obrigatório' })
  profileId: string;
}

export class UpdateUserDto {
  @IsString({ message: 'Primeiro nome deve ser uma string' })
  @IsNotEmpty({ message: 'Primeiro nome não pode estar vazio' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Último nome deve ser uma string' })
  @IsNotEmpty({ message: 'Último nome não pode estar vazio' })
  @IsOptional()
  lastName?: string;

  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  @IsOptional()
  email?: string;

  @IsBoolean({ message: 'Status ativo deve ser verdadeiro ou falso' })
  @IsOptional()
  isActive?: boolean;

  @IsString({ message: 'ID do perfil deve ser uma string' })
  @IsNotEmpty({ message: 'ID do perfil não pode estar vazio' })
  @IsOptional()
  profileId?: string;
}

export class UpdateUserStatusDto {
  @IsBoolean({ message: 'Status ativo deve ser verdadeiro ou falso' })
  isActive: boolean;
}
