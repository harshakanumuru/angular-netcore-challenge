import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as autoPartNames from '../assets/json/auto-parts.json';
import * as carNames from '../assets/json/cars.json';
import { CarRegistrationModel } from './car-registration.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Output() submitCarAction: EventEmitter<CarRegistrationModel> = new EventEmitter<CarRegistrationModel>();
  carRegistrationModel: CarRegistrationModel = new CarRegistrationModel();
  carRegistrationForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  carOptions: Array<any>;
  autoPartsOptions: Array<any>;
  constructor() {
    this.carOptions = (carNames as any).default;
    this.autoPartsOptions = (autoPartNames as any).default;
    this.carRegistrationModel.colorCode = '#ffffff';
  }
  ngOnInit(): void {
    this.carRegistrationForm = new FormGroup({
      fullName: new FormControl(this.carRegistrationModel.fullName,
        [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.maxLength(75)]),
      selectedCar: new FormControl(this.carRegistrationModel.selectedCar),
      selectedAutoParts: new FormControl(this.carRegistrationModel.selectedAutoParts),
      colorCode: new FormControl(this.carRegistrationModel.colorCode)
    });
  }
  submitForm(): void {
    this.submitCarAction.emit(this.carRegistrationModel);
  }
  resetForm(): void {
    this.carRegistrationForm.reset();
    this.carRegistrationModel.colorCode = '#ffffff';
  }
}
