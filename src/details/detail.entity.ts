import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import PaginatedResponse from '../commons/paginated.type';

@ObjectType()
@Entity({ name: 'details' })
export class Detail {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    type: string;

    @Field({ nullable: true })
    @Column()
    displayImage: string;

    @Field({ nullable: true })
    @Column()
    body: string;

    @Field(() => Date)
    @Column()
    createdAt: Date;
}

@ObjectType()
export class PaginatedDetailResponse extends PaginatedResponse(Detail) {}
