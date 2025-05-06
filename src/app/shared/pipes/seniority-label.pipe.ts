import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'seniorityLabel', standalone: true })

export class SeniorityLabelPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) {
            return '';
        }

        const lowercasedValue = value.toLowerCase();

        return {
            junior: 'Junior',
            senior: 'Senior',
        }[lowercasedValue] || value;
    }
}
