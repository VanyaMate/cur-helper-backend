import { Module } from '@nestjs/common';
import { ThemeModule } from '@/modules/api/v1/theme/theme.module';


@Module({
    imports: [
        ThemeModule,
    ],
})
export class ApiV1Module {

}