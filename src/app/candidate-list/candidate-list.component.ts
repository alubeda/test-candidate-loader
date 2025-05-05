import { Component, OnInit } from '@angular/core';
import { CandidateService, Candidate } from '../services/candidate.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SeniorityLabelPipe } from '../shared/pipes/seniority-label.pipe';

@Component({
    selector: 'app-candidate-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        SeniorityLabelPipe,
    ],
    templateUrl: './candidate-list.component.html',
    styleUrl: './candidate-list.component.less'
})
export class CandidateListComponent {
    public candidates: Candidate[] = [];
    public displayedColumns: string[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];

    constructor(private candidateService: CandidateService) {}

    ngOnInit(): void {
        this.candidateService.getCandidates().subscribe((data: any) => {
            this.candidates = data;
        });
    }
}
