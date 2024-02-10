import { TestPassingResult } from '@/domain/services/test-passing/test-passing.types';


export type TestPassingResultGrade = {
    perfect: number;
    satis: number;
    unsatis: number;
}

export type GetTestPassingResult = (points: number, pointsGrade: TestPassingResultGrade) => TestPassingResult;