import { Reflector } from '@nestjs/core';


export const AccessFor = Reflector.createDecorator<number[]>();