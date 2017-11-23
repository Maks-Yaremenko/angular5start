import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { throttleTime, debounceTime } from 'rxjs/operators';

const debounce = 250;

interface ControlMessagesBind {
  form: FormGroup;
  name: string;
}

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
  @Input() bind: ControlMessagesBind;
  @Input() messages = {};
  private control: AbstractControl;
  private errorMessage = '';

  @HostListener('window:click', ['$event']) private clickGlobal(event) {
    if (event.target.type === 'submit' && this.control) {
      this.control.markAsTouched();
      this.errorMessage = this.getErrorMessage();
    }
  }

  ngOnInit() {
    this.control = this.bind.form.get(this.bind.name);
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
