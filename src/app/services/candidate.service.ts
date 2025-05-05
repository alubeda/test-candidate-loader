import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    private apiUrl = 'http://localhost:3000/candidates';

    constructor(private http: HttpClient) {}

    getCandidates(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.apiUrl);
    }

    addCandidate(candidate: Candidate): Observable<Candidate> {
        return this.http.post<Candidate>(this.apiUrl, candidate);
    }
}
