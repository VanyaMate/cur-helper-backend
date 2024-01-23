import { Theme } from '@/domain/theme/theme.types';


export type With<T, C extends any[]> = C extends [ infer First, ...infer Rest ]
                                       ? First & With<T, Rest>
                                       : C extends [ infer Only ] ? Only & T
                                                                  : T;