import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-candidate-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
  ],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.less'
})

export class CandidateFormComponent {
    private fb = inject(FormBuilder);

    form = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
    });

    submit() {
        if (this.form.valid) {
            console.warn('Valid form', this.form.value);
        }
    }
}
