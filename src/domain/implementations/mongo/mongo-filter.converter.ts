import { Filter, IConverter } from '@/domain/service.types';
import { FilterQuery } from 'mongoose';


export class MongoFilterConverter implements IConverter<Filter<any>, FilterQuery<any>> {
    to (from: Filter<any>): FilterQuery<any> {
        const filter: FilterQuery<any> = {};

        Object.entries(from).forEach(([ key, value ]) => {
            if (value.type === 'match') {
                filter[key] = { $regexp: new RegExp(`${ value.value }`) };
            } else {
                filter[key] = value.value;
            }
        });

        return filter;
    }

    from (to: FilterQuery<any>): Filter<any> {
        throw new Error('Method not implemented.');
    }
}