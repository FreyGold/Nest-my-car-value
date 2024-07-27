import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async find(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    return user;
  }
  findAll(email: string) {
    return this.repo.findBy({ email });
  }
  async patch(id: number, attrs: Partial<User>) {
    const user = await this.find(id);
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.find(id);
    return this.repo.remove(user);
  }
}
