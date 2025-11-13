import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar novo perfil',
    description: 'Cria um novo perfil no sistema com o nome fornecido.',
  })
  @ApiBody({
    type: CreateProfileDto,
    description: 'Dados para criação do perfil',
    examples: {
      exemplo: {
        value: {
          name: 'Administrador',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Perfil criado com sucesso',
    schema: {
      example: {
        id: 'uuid-gerado',
        name: 'Administrador',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
    schema: {
      example: {
        statusCode: 400,
        message: ['Nome é obrigatório', 'Nome deve ser uma string'],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar perfis',
    description: 'Retorna todos os perfis cadastrados no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de perfis retornada com sucesso',
    schema: {
      example: [
        {
          id: '1',
          name: 'Admin',
        },
        {
          id: '2',
          name: 'User',
        },
        {
          id: '3',
          name: 'Manager',
        },
      ],
    },
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar perfil por ID',
    description: 'Retorna um perfil específico pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do perfil',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil encontrado com sucesso',
    schema: {
      example: {
        id: '1',
        name: 'Admin',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Perfil não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Perfil com ID xyz não encontrado',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar perfil',
    description: 'Atualiza o nome de um perfil existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do perfil',
    example: '1',
  })
  @ApiBody({
    type: UpdateProfileDto,
    description: 'Novos dados para o perfil',
    examples: {
      exemplo: {
        value: {
          name: 'Super Administrador',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado com sucesso',
    schema: {
      example: {
        id: '1',
        name: 'Super Administrador',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  @ApiNotFoundResponse({
    description: 'Perfil não encontrado',
  })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir perfil',
    description: 'Remove um perfil do sistema permanentemente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do perfil a ser excluído',
    example: '1',
  })
  @ApiNoContentResponse({
    description: 'Perfil excluído com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Perfil não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Perfil com ID xyz não encontrado',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
