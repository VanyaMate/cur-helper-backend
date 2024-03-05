import { Injectable } from '@nestjs/common';
import { ErrorToHttpConverter } from '@/domain/converters/error/error-to-http.converter';


@Injectable()
export class ErrorTypeConverter extends ErrorToHttpConverter {
}