import { FilterQuery } from 'mongoose';
import { Filter } from '@vanyamate/cur-helper-types';
import { IMongoFilterConverter } from '@/domain/converters/mongo/mongo-converters.types';


export class MongoFilterConverter implements IMongoFilterConverter {
    to (from: Filter<any>): FilterQuery<any> {
        const filter: FilterQuery<any> = {};

        Object.entries(from).forEach(([ key, value ]) => {
            if (value.type === 'match') {
                filter[key === 'id' ? '_id'
                                    : key] = { $regexp: new RegExp(`${ value.value }`) };
            } else {
                filter[key === 'id' ? '_id' : key] = value.value;
            }
        });

        return filter;
    }
    ;

    from (to: FilterQuery<any>): Filter<any> {
        throw new Error('Method not implemented.');
    }
}