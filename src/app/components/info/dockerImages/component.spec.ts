import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerImagesComponent } from './component';
import { TranslateModule } from '@ngx-translate/core';
import { InfoModule } from '../module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: DockerImagesComponent;
  let fixture: ComponentFixture<DockerImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        InfoModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
