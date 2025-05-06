import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CandidateFormComponent } from './candidate-form.component';
import { CandidateService, Candidate } from '../services/candidate.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CandidateFormComponent', () => {
    let component: CandidateFormComponent;
    let fixture: ComponentFixture<CandidateFormComponent>;
    let candidateServiceSpy: jasmine.SpyObj<CandidateService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        candidateServiceSpy = jasmine.createSpyObj('CandidateService', ['addCandidate']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [CandidateFormComponent],
            providers: [
                { provide: CandidateService, useValue: candidateServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
        })
        .compileComponents();

        fixture = TestBed.createComponent(CandidateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the form with default values', () => {
        expect(component).toBeTruthy();
        const form = component.form;
        expect(form).toBeDefined();
        expect(form.valid).toBeFalse();
    });

    it('should mark the form as valid when all fields are filled', () => {
        component.form.setValue({
            name: 'Jane',
            surname: 'Doe',
            seniority: 'junior',
            yearsOfExperience: 3,
            availability: true,
        });

        expect(component.form.valid).toBeTrue();
    });

    it('should mark the form as invalid when a field is empty', () => {
        component.form.setValue({
            name: '',
            surname: 'Doe',
            seniority: 'junior',
            yearsOfExperience: 3,
            availability: true,
        });

        expect(component.form.valid).toBeFalse();
    });

    it('should mark the form as invalid when a field is invalid', () => {
        component.form.setValue({
            name: 'Jane',
            surname: 'Doe',
            seniority: 'junior',
            yearsOfExperience: -5,
            availability: true,
        });

        expect(component.form.valid).toBeFalse();
        expect(component.form.get('yearsOfExperience')?.errors).toBeDefined();
    });

    it('should call candidateService and navigate on submit', fakeAsync(() => {
        const candidate: Candidate = {
            name: 'Jane',
            surname: 'Doe',
            seniority: 'junior',
            yearsOfExperience: 3,
            availability: true,
        };

        candidateServiceSpy.addCandidate.and.returnValue(of(candidate));

        component.form.setValue(candidate);

        component.submit();

        tick(); // wait for lastValueFrom

        expect(candidateServiceSpy.addCandidate).toHaveBeenCalledWith(candidate);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/list']);
    }));
});
