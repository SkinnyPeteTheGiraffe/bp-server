import { Service, Inject } from 'typedi';
import { User } from './user.entity';
import { Connection, MongoRepository } from 'typeorm';
import { UserInput } from './user.input';

@Service()
export class UserService {
    private repository: MongoRepository<User>;

    constructor(@Inject('CONNECTION') private readonly connection: Connection) {
        this.repository = this.connection.getMongoRepository(User);
    }

    async user(id: string) {
        return this.repository.findOne(id);
    }

    async list(query: UserInput) {
        return this.repository.find(query);
    }
}
