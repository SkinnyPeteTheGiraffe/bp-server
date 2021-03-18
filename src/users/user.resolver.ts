import { Inject, Service } from 'typedi';
import { Resolver, Query, Args, Arg, Authorized } from 'type-graphql';
import { User, PaginatedUserResponse } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './user.input';

@Service()
@Resolver(() => User)
export class DetailResolver {

    constructor(private readonly userService: UserService) {}

    @Query(() => User, { nullable: true })
    async user(@Arg('id') id: string) {
        return this.userService.user(id);
    }

    @Authorized("ADMIN", "MODERATOR")
    @Query(() => PaginatedUserResponse)
    async users(@Args() query: UserInput): Promise<PaginatedUserResponse> {
        const list = await this.userService.list(query);
        return {
            items: list,
            total: list.length,
        };
    }
}
