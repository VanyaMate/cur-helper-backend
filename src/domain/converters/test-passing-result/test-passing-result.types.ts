import { TestPassingResult } from '@vanyamate/cur-helper-types';


export type TestPassingResultGrade = {
    perfect: number;
    satis: number;
    unsatis: number;
}

export type GetTestPassingResult = (points: number, pointsGrade: TestPassingResultGrade) => TestPassingResult;