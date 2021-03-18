import { User } from './user.entity';
import { ArgsType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class UserInput implements Partial<User> {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    email: string;

    @Field(() => [String], { nullable: true })
    roles: string[];

    @Field(() => Date, { nullable: true })
    createdAt: Date;

    @Field(() => Int, { nullable: true })
    @Min(0)
    skip: number;

    @Field(() => Int, { nullable: true })
    @Min(1)
    @Max(50)
    take: number;
}

@ArgsType()
export class CreateUserInput implements Partial<User> {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

}
