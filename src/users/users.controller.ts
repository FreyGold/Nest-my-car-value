import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
  @Get('/:id')
  findUser(@Param() param: { id: number }) {
    return this.usersService.find(param.id);
  }
  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }
  @Patch('/:id')
  patchUser(@Body() body: UpdateUserDto, @Param() param: { id: number }) {
    console.log(body);
    console.log(param);
    return this.usersService.patch(param.id, body);
  }
  @Delete('/:id')
  deleteUser(@Param() param: { id: number }) {
    return this.usersService.remove(param.id);
  }
}
