import { ElementRef, HostListener, Directive } from '@angular/core';
import { ElectronActions } from '../../../store/communication/electron/actions';
import { dispatch } from '@angular-redux/store';

@Directive({
  selector: '[appExternalHref]'
})
export class ExternalHrefDirective {

  @dispatch() readonly openExternal = url => ElectronActions.ELECTRON_OPEN_EXTERNAL(url);

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    if (!this.isAnchor(event.srcElement)) {
      return;
    }
    event.preventDefault();
    this.openExternal(event.srcElement.href);
  }

  isAnchor = (arg: any): arg is HTMLAnchorElement => arg.href && typeof (arg.href) === 'string';
}
