import {
    GetTestPassingResult, TestPassingResultGrade,
} from '@/domain/converters/test-passing-result/test-passing-result.types';


export const getTestPassingResult: GetTestPassingResult = (points: number, pointsGrade: TestPassingResultGrade) => {
    if (points >= pointsGrade.perfect) {
        return 'perfect';
    } else if (points >= pointsGrade.satis) {
        return 'satis';
    } else if (points >= pointsGrade.unsatis) {
        return 'unsatis';
    } else {
        return 'unsatis';
    }
};