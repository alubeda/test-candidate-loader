import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Candidate {
    name: string;
    surname: string;
    seniority: 'junior' | 'senior';
    yearsOfExperience: number;
    availability: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    private candidates: Candidate[] = [
        { name: 'Alice', surname: 'Smith', seniority: 'junior', yearsOfExperience: 2, availability: true },
        { name: 'Bob', surname: 'Jones', seniority: 'senior', yearsOfExperience: 5, availability: false },
    ];

    constructor() {}

    getCandidates(): Observable<Candidate[]> {
        return of(this.candidates);
    }

    addCandidate(candidate: Candidate): void {
        this.candidates.push(candidate);
    }
}
