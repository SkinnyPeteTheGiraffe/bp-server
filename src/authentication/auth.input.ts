import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginInput implements Partial<any> {
    @Field()
    email: string;

    @Field()
    password: string;
}
