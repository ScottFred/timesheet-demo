import {ErrorHandler, Injectable, Injector, ViewContainerRef} from '@angular/core';
import * as jquery from 'jquery';
import * as toastr from 'toastr';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor() {}

  handleError(error) {
    let errorMessage = error.message || error.statusText || error || 'An error occurred';
    errorMessage = errorMessage.replace(/Uncaught.*:/gi, '');

    this.showError(errorMessage);
  }

  private showError(errorMessage: string) {
    toastr.options.timeOut = 0;
    toastr.options.extendedTimeOut = 0;
    toastr.options.closeButton = true;
    toastr.error(errorMessage, 'Error');
  }
}
