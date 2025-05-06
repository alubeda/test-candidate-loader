import { SeniorityLabelPipe } from './seniority-label.pipe';

describe('SeniorityLabelPipe', () => {
    let pipe: SeniorityLabelPipe;

    beforeEach(() => {
        pipe = new SeniorityLabelPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return "Junior" for "junior"', () => {
        expect(pipe.transform('junior')).toBe('Junior');
    });

    it('should return "Senior" for "senior"', () => {
        expect(pipe.transform('senior')).toBe('Senior');
    });

    it('should return the same value if it is neither "junior" nor "senior"', () => {
        expect(pipe.transform('mid')).toBe('mid');
        expect(pipe.transform('expert')).toBe('expert');
    });

    it('should return an empty string if value is null or undefined', () => {
        expect(pipe.transform(null)).toBe('');
        expect(pipe.transform(undefined)).toBe('');
    });

    it('should handle mixed case values', () => {
        expect(pipe.transform('JuNiOr')).toBe('Junior');
        expect(pipe.transform('SeNiOr')).toBe('Senior');
    });
});
