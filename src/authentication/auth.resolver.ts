import { Service } from 'typedi';
import { Args, Mutation, Resolver } from 'type-graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './auth.input';

@Service()
@Resolver()
export default class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => String, { nullable: true })
    async login(@Args() { email, password }: LoginInput) {
        return this.authService.login(email, password)
    }
}
