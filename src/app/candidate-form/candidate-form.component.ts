import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Workbook } from 'exceljs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Candidate, CandidateService } from '../services/candidate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-candidate-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
  ],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.less'
})

export class CandidateFormComponent {
    private fb = inject(FormBuilder);

    constructor(
        private candidateService: CandidateService,
        private router: Router
    ) {}

    form = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        seniority: ['', [Validators.required, Validators.pattern(/^(junior|senior)$/)]],
        yearsOfExperience: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
        availability: [false, Validators.required],
    });

    isLoading: boolean = false;
    excelError: string | null = null;
    fileName: string | null = null;

    async onFileChange(event: any) {
        const file = event.target.files[0];

        if (file) {
            return this.processFile(file);
        }
    }

    private async processFile(file: File) {
        try {
            this.isLoading = true;
            this.fileName = file.name;

            const buffer = await file.arrayBuffer();
            const workbook = new Workbook();
            await workbook.xlsx.load(buffer);

            const worksheet = workbook.worksheets[0];
            const row = worksheet.getRow(1);

            const seniority = row.getCell(1).text.toLowerCase();
            const yearsOfExperience = parseInt(row.getCell(2).value as string) || null;

            const availabilityText = row.getCell(3).text;
            const availability = availabilityText === '1' ? true : availabilityText === '0' ? false : undefined;

            this.form.patchValue({
                seniority,
                yearsOfExperience,
                availability,
            });

            this.form.get('seniority')?.markAsTouched();
            this.form.get('yearsOfExperience')?.markAsTouched();
            this.form.get('availability')?.markAsTouched();

            this.excelError = null;
        } catch (error) {
            this.fileName = null;
            this.excelError = 'The file could not be read. Please make sure it is a valid Excel file.';
        } finally {
            this.isLoading = false;
        }
    }

    submit() {
        if (this.form.valid) {
            const candidate = this.form.getRawValue();
            this.candidateService.addCandidate(candidate as Candidate);
            this.router.navigate(['/list']);
        }
    }
}
