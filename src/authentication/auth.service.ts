import { Service, Inject } from 'typedi';
import { Connection, MongoRepository } from 'typeorm';
import { User } from '../users/user.entity';
import * as jwt from 'jsonwebtoken';
import { compare } from '../commons/encryption';

@Service()
export class AuthService {
    private repository: MongoRepository<User>;

    constructor(@Inject('CONNECTION') private readonly connection: Connection) {
        this.repository = this.connection.getMongoRepository(User);
    }

    async login(email: string, password: string): Promise<string | undefined> {
        const signed = process.env.JWT_SECRET;
        const user = await this.repository.findOne({ email });
        if (user && signed) {
            const matched = await compare(password, user.password);
            if (matched) {
                const { password, ...rest } = user
                return jwt.sign(
                    rest,
                    signed,
                    {
                        expiresIn: '24h',
                    }
                );
            }
        }
        return undefined;
    }
}
