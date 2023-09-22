import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import * as CommonUtils from './common-functions';

export function castFormControlAsFormArray(control: AbstractControl): FormArray {
  return control as FormArray;
}

export function showValidationMessage(control: AbstractControl | null, submitted: boolean): boolean {
  if (CommonUtils.isNullOrEmpty(control)) {
    return false;
  }
  const ctrl = control as AbstractControl;
  return ctrl.invalid && (submitted || ctrl.dirty);
}

export function copyFormControl<T>(form: FormGroup, bean: T): T {
  for (var attr in bean) {
    if (form.controls[attr]) {
      bean[attr] = form.controls[attr].value;
    }
  }
  return bean;
}

export function showTableValidationMessage(value: any | null, submitted: boolean): boolean {
  if (CommonUtils.isNullOrEmpty(value)) {
    return false;
  }
  return value && submitted;
}
