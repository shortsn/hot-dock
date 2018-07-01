import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard } from '@clr/angular';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateContainerWizardComponent implements OnInit {

  @ViewChild('wizardmd') wizard: ClrWizard;

  public get open(): boolean {
    return true;
  }
  public set open(value: boolean) {
    if (value) { return; }
    this._router.navigate(['.']);
  }

  // readonly queryParams$: Observable<QueryParams>;

  constructor(private _router: Router) {
    // this.queryParams$ = route.queryParams;
  }

  ngOnInit() {
  }

}
