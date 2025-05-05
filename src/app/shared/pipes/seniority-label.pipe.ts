import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'seniorityLabel', standalone: true })

export class SeniorityLabelPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';
        if (value.toLowerCase() === 'junior') return 'Junior';
        if (value.toLowerCase() === 'senior') return 'Senior';
        return value;
    }
}
