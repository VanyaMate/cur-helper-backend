import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import {
    MongoFilterConverter,
} from '@/domain/converters/mongo/mongo-filter.converter';
import { Filter, IConverter } from '@vanyamate/cur-helper-types';


@Injectable()
export class MongoFilterConverterService implements IConverter<Filter<any>, FilterQuery<any>> {
    private readonly _converter: IConverter<Filter<any>, FilterQuery<any>>;

    constructor () {
        this._converter = new MongoFilterConverter();
    }

    to (from: Filter<any>): FilterQuery<any> {
        return this._converter.to(from);
    }

    from (to: FilterQuery<any>): Filter<any> {
        return this._converter.from(to);
    }
}