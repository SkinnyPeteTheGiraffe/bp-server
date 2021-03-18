import { Detail } from './detail.entity';
import { ArgsType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class DetailInput implements Partial<Detail> {
    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    title: string;

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
