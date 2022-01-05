import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() { // TODO: protect with JWT
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

//   @Mutation(() => User)
//   updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
//     return this.usersService.update(updateUserInput.id, updateUserInput);
//   }

//   @Mutation(() => User)
//   removeUser(@Args('id', { type: () => Int }) id: number) {
//     return this.usersService.remove(id);
//   }
}
