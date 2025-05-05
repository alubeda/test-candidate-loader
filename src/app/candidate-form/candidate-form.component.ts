import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Workbook } from 'exceljs';

@Component({
    selector: 'app-candidate-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
  ],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.less'
})

export class CandidateFormComponent {
    private fb = inject(FormBuilder);

    form = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        seniority: ['', Validators.required],
        yearsOfExperience: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
        availability: [false, Validators.required],
    });

    async onFileChange(event: any) {
        const file = event.target.files[0];

        if (file) {
            return this.processFile(file);
        }
    }

    private async processFile(file: File) {
        const buffer = await file.arrayBuffer();
        const workbook = new Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.worksheets[0];
        const row = worksheet.getRow(1);

        const seniority = row.getCell(1).text;
        const yearsOfExperience = parseInt(row.getCell(2).value as string);
        const availability = row.getCell(3).text === '1';

        console.warn('DAME VALORES', { seniority, yearsOfExperience, availability });

        this.form.patchValue({
            seniority,
            yearsOfExperience,
            availability,
        });
    }

    submit() {
        if (this.form.valid) {
            console.warn('Valid form', this.form.value);
        }
    }
}
