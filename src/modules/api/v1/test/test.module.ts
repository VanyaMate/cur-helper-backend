import { Module } from '@nestjs/common';
import { TestController } from '@/modules/api/v1/test/test.controller';
import { TestService } from '@/modules/api/v1/test/test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from '@/domain/test/implementations/mongo/mongo-test.model';


@Module({
    controllers: [
        TestController,
    ],
    providers  : [
        TestService,
    ],
    imports    : [
        MongooseModule.forFeature([
            { name: Test.name, schema: TestSchema },
        ]),
    ],
})
export class TestModule {

}