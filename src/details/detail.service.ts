import { Service, Inject } from 'typedi';
import { Detail } from './detail.entity';
import { Connection, MongoRepository, ObjectID } from 'typeorm';
import { DetailInput } from './detail.input';
import { ObjectType } from 'type-graphql';

@Service()
export class DetailService {
    private repository: MongoRepository<Detail>;

    constructor(@Inject('CONNECTION') private readonly connection: Connection) {
        this.repository = this.connection.getMongoRepository(Detail);
    }

    async detail(id: string) {
        return this.repository.findOne(id);
    }

    async list(query: DetailInput) {
        return this.repository.find(query);
    }
}
