import { Service } from 'typedi';
import { Resolver, Query, Args, Arg } from 'type-graphql';
import { Detail, PaginatedDetailResponse } from './detail.entity';
import { DetailService } from './detail.service';
import { DetailInput } from './detail.input';

@Service()
@Resolver(() => Detail)
export class DetailResolver {
    constructor(private readonly detailService: DetailService) {}

    @Query((returns) => Detail, { nullable: true })
    async detail(@Arg('id') id: string) {
        return this.detailService.detail(id);
    }

    @Query(() => PaginatedDetailResponse)
    async details(@Args() query: DetailInput): Promise<PaginatedDetailResponse> {
        const list = await this.detailService.list(query);
        return {
            items: list,
            total: list.length,
        };
    }
}
