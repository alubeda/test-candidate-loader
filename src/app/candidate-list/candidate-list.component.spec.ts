import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateListComponent } from './candidate-list.component';
import { CandidateService, Candidate } from '../services/candidate.service';
import { of } from 'rxjs';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CandidateListComponent', () => {
    let component: CandidateListComponent;
    let fixture: ComponentFixture<CandidateListComponent>;
    let mockCandidateService: jasmine.SpyObj<CandidateService>;

    const mockCandidates: Candidate[] = [
        { name: 'Alice', surname: 'Smith', seniority: 'junior', yearsOfExperience: 2, availability: true },
        { name: 'Bob', surname: 'Jones', seniority: 'senior', yearsOfExperience: 5, availability: false },
    ];

    beforeEach(async () => {
        mockCandidateService = jasmine.createSpyObj('CandidateService', ['getCandidates']);
        mockCandidateService.getCandidates.and.returnValue(of(mockCandidates));

        await TestBed.configureTestingModule({
            imports: [CandidateListComponent],
            providers: [{ provide: CandidateService, useValue: mockCandidateService }],
            // schemas: [NO_ERRORS_SCHEMA], // ignora componentes/material internos
        })
        .compileComponents();

        fixture = TestBed.createComponent(CandidateListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load candidates on init', () => {
        expect(component.candidates.length).toBe(2);
        expect(component.candidates[0].name).toBe('Alice');
        expect(component.candidates[1].yearsOfExperience).toBe(5);
    });
});
