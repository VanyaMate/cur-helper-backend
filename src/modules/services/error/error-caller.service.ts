import { ErrorCaller } from '@/domain/error/ErrorCaller';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ErrorCallerService extends ErrorCaller {
}