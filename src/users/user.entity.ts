import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import PaginatedResponse from '../commons/paginated.type';
import { IUser } from './user.interface';

@ObjectType()
@Entity({ name: 'users' })
export class User implements IUser {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @Field(() => [String])
    @Column()
    roles: string[];

    @Field(() => Date)
    @Column()
    createdAt: Date;
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {}
