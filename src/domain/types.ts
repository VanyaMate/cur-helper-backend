export type With<T, C extends any[]> = C extends [ infer First, ...infer Rest ]
                                       ? First & With<T, Rest>
                                       : C extends [ infer Only ] ? Only & T
                                                                  : T;

export type Create<Type, Fields extends keyof Type> =
    Pick<Type, Fields>
    & Partial<Omit<Type, Fields>>