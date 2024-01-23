export type StringFilterType =
    'equal'
    | 'match';

export type Filter<Type> = {
    [Key in keyof Partial<Type>]: {
        value: Type[Key],
        type: Type[Key] extends string ? StringFilterType : 'equal',
    }
}

export type Options<DataType> = {
    offset?: number;
    limit?: number;
    sort?: [ keyof DataType, 'asc' | 'desc' ] | [];
}

export type MultiplyResponse<DataType> = {
    options: Options<DataType>;
    count: number;
    list: DataType[];
}

export interface ICRUD<Data, CreateData, UpdateData, IdType> {
    create (data: CreateData): Promise<Data>;

    read (data: Filter<Data>): Promise<Data | null>;

    update (id: IdType, data: UpdateData): Promise<Data>;

    delete (id: IdType): Promise<boolean>;
}

export interface IConverter<From, To> {
    to (from: From): To;

    from (to: To): From;
}