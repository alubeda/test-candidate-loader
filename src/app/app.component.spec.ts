import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { DebugElement } from '@angular/core';

class MockActivatedRoute {
    snapshot = {
        data: {
            title: 'candidate-loader',
        },
    };
}

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let de: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterModule, MatToolbarModule, MatButtonModule],
            providers: [{ provide: ActivatedRoute, useClass: MockActivatedRoute }],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have the 'candidate-loader' title`, () => {
        fixture.detectChanges();
        const titleElement = de.query(By.css('mat-toolbar'));
        expect(titleElement.nativeElement.textContent).toContain('candidate-loader');
    });
});
