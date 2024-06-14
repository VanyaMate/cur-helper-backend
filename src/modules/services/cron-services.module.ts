import { Module } from '@nestjs/common';
import { ServicesModule } from '@/modules/services/services.module';
import {
    TestPassingModule,
} from '@/modules/api/v1/test-passing/test-passing.module';
import {
    MongoTestPassingTimeCheckSchedule,
} from '@/modules/services/mongo/schedule/mongo-test-passing-time-check-schedule';
import {
    MongoDialogNewsParserSchedule,
} from '@/modules/services/mongo/schedule/mongo-dialog-news-parser-schedule';


@Module({
    imports: [
        ServicesModule,
        TestPassingModule,
    ],
    providers: [
        MongoTestPassingTimeCheckSchedule,
        MongoDialogNewsParserSchedule,
    ],
})
export class CronServicesModule {

}