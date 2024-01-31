import { Module } from '@nestjs/common';
import { ThemeModule } from '@/modules/api/v1/theme/theme.module';
import { TestModule } from '@/modules/api/v1/test/test.module';


@Module({
    imports: [
        ThemeModule,
        TestModule,
    ],
})
export class ApiV1Module {

}