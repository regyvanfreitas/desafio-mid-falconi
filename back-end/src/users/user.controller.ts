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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdateUserStatusDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar novo usuário',
    description: 'Cria um novo usuário no sistema com os dados fornecidos.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados para criação do usuário',
    examples: {
      exemplo: {
        value: {
          firstName: 'João',
          lastName: 'Silva',
          email: 'joao.silva@email.com',
          profileId: '1',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        id: 'uuid-gerado',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com',
        isActive: true,
        profileId: '1',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou e-mail já existe',
    schema: {
      example: {
        statusCode: 400,
        message: 'E-mail já existe',
        error: 'Bad Request',
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
    description:
      'Retorna todos os usuários ou filtra por perfil se profileId for fornecido.',
  })
  @ApiQuery({
    name: 'profileId',
    required: false,
    description: 'ID do perfil para filtrar usuários',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      example: [
        {
          id: '1',
          firstName: 'João',
          lastName: 'Silva',
          email: 'joao.silva@email.com',
          isActive: true,
          profileId: '1',
        },
        {
          id: '2',
          firstName: 'Maria',
          lastName: 'Santos',
          email: 'maria.santos@email.com',
          isActive: true,
          profileId: '2',
        },
      ],
    },
  })
  findAll(@Query('profileId') profileId?: string) {
    return this.userService.findAll(profileId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description: 'Retorna um usuário específico pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    schema: {
      example: {
        id: '1',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com',
        isActive: true,
        profileId: '1',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário com ID xyz não encontrado',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar usuário',
    description:
      'Atualiza parcialmente os dados de um usuário. Apenas os campos fornecidos serão atualizados.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '1',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Dados para atualização do usuário (todos opcionais)',
    examples: {
      'atualizar-nome': {
        summary: 'Atualizar apenas nome',
        value: {
          firstName: 'Pedro',
        },
      },
      'atualizar-email': {
        summary: 'Atualizar apenas email',
        value: {
          email: 'novo.email@exemplo.com',
        },
      },
      'atualizar-completo': {
        summary: 'Atualizar vários campos',
        value: {
          firstName: 'Pedro',
          lastName: 'Santos',
          email: 'pedro.santos@email.com',
          profileId: '2',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    schema: {
      example: {
        id: '1',
        firstName: 'Pedro',
        lastName: 'Silva',
        email: 'joao.silva@email.com',
        isActive: true,
        profileId: '1',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou e-mail já existe',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Atualizar status do usuário',
    description: 'Atualiza apenas o status ativo/inativo do usuário.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '1',
  })
  @ApiBody({
    type: UpdateUserStatusDto,
    description: 'Novo status do usuário',
    examples: {
      ativar: {
        summary: 'Ativar usuário',
        value: { isActive: true },
      },
      desativar: {
        summary: 'Desativar usuário',
        value: { isActive: false },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Status do usuário atualizado com sucesso',
    schema: {
      example: {
        id: '1',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com',
        isActive: false,
        profileId: '1',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    return this.userService.updateStatus(id, updateUserStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir usuário',
    description: 'Remove um usuário do sistema permanentemente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário a ser excluído',
    example: '1',
  })
  @ApiNoContentResponse({
    description: 'Usuário excluído com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário com ID xyz não encontrado',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
