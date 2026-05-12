import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient
} from '@angular/common/http';
import { ActivatedRoute }
from '@angular/router';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent],providers: [

  provideHttpClient(),

  provideHttpClientTesting(),{
  provide: ActivatedRoute,

  useValue: {

    snapshot: {

      paramMap: {

        get: () => '1'

      }

    }

  }

}

]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
