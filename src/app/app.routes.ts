import { Routes } from '@angular/router';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'form', pathMatch: 'full' },
    { path: 'form', component: CandidateFormComponent },
    { path: 'list', component: CandidateListComponent },
];
