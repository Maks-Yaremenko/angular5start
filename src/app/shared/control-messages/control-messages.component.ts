import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { throttleTime, debounceTime } from 'rxjs/operators';

const debounce = 250;

function getConfig(validatorValue) {
  return {
    required: 'Please fill in this field',
    url: 'Please enter a valid URL',
    email: 'Please enter a valid Email',
    minlength: `Minimum length ${validatorValue.requiredLength}`,
    maxlength: `Maximum length ${validatorValue.requiredLength}`,
    min: `Minimum value must be greater or equal ${validatorValue}`,
    max: `Maximum value mast be less ${validatorValue}`
  };
}

@Component({
  selector: 'ap-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() messages = {};
  private errorMessage = '';
  private controlName = '';

  @HostListener('window:click', ['$event']) private clickGlobal({ target }: MouseEvent) {
    const isButtonSubmit = target instanceof HTMLButtonElement && target.type === 'submit';
    const form = target.closest('form');
    const controlElement = form && this.controlName && form.querySelector(`[formControlName="${this.controlName}"]`);
    if (isButtonSubmit && controlElement && this.control) {
      this.control.markAsTouched();
      this.errorMessage = this.getErrorMessage();
    }
  }

  ngOnInit() {
    this.controlName = Object.keys(this.control.parent.controls).reduce(
      (controlName, name) => (this.control === this.control.parent.get(name) ? name : controlName),
      '',
    );
    this.control.valueChanges
      .pipe(
        throttleTime(debounce),
        debounceTime(debounce)
      )
      .subscribe(() => this.errorMessage = this.getErrorMessage());
    this.errorMessage = this.getErrorMessage();
  }

  private getValidatorErrorMessage(propertyName: string) {
    const validatorValue = this.control.errors[propertyName];
    return this.messages[propertyName] || getConfig(validatorValue)[propertyName];
  }

  private getErrorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        if (typeof this.control.errors[propertyName] === 'string') {
          return this.control.errors[propertyName];
        }
        return this.getValidatorErrorMessage(propertyName);
      }
    }
    return '';
  }
}
