import { Component } from '@angular/core';
import { CandidateService, Candidate } from '../services/candidate.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SeniorityLabelPipe } from '../shared/pipes/seniority-label.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-candidate-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        SeniorityLabelPipe,
        MatProgressSpinnerModule,
    ],
    templateUrl: './candidate-list.component.html',
    styleUrl: './candidate-list.component.less'
})
export class CandidateListComponent {
    public candidates: Candidate[] = [];
    public displayedColumns: string[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];
    public isLoading: boolean = false;
    public error: string | null = null;

    constructor(private candidateService: CandidateService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.error = null;

        this.candidateService.getCandidates()
            .pipe(
                catchError(error => {
                    this.isLoading = false;
                    this.error = 'Failed to load candidates. Please try again later.';

                    return of([]);
                })
            ).subscribe((data: any) => {
                this.candidates = data;
                this.isLoading = false;
            });
    }
}
