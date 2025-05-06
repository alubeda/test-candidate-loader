import { TestBed } from '@angular/core/testing';
import { CandidateService, Candidate } from './candidate.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CandidateService', () => {
    let service: CandidateService;
    let httpMock: HttpTestingController;

    const mockCandidates: Candidate[] = [
        { name: 'Jane', surname: 'Doe', seniority: 'senior', yearsOfExperience: 10, availability: true },
        { name: 'John', surname: 'Smith', seniority: 'junior', yearsOfExperience: 5, availability: false },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CandidateService, provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(CandidateService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve candidates via GET', () => {
        service.getCandidates().subscribe((candidates) => {
          expect(candidates.length).toBe(2);
          expect(candidates).toEqual(mockCandidates);
        });

        const req = httpMock.expectOne('http://localhost:3000/candidates');
        expect(req.request.method).toBe('GET');
        req.flush(mockCandidates);
    });

    it('should send a candidate via POST', () => {
        const newCandidate: Candidate = {
            name: 'Alice',
            surname: 'Smith',
            seniority: 'junior',
            yearsOfExperience: 2,
            availability: true,
        };

        service.addCandidate(newCandidate).subscribe((candidate) => {
          expect(candidate).toEqual(newCandidate);
        });

        const req = httpMock.expectOne('http://localhost:3000/candidates');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newCandidate);
        req.flush(newCandidate);
    });
});
