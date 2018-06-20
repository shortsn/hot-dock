import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerImagesComponent } from './component';
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { InfoModule } from '../module';
import { CoreModule } from '../../core/module';

describe('HomeComponent', () => {
  let component: DockerImagesComponent;
  let fixture: ComponentFixture<DockerImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerImagesComponent ],
      imports: [
        CoreModule,
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
