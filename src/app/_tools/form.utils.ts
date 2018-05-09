import { FormGroup, FormControl } from '@angular/forms';

export const validateAllFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach(feild => {
    const control = formGroup.get(feild);
    if (control instanceof FormControl) {
      control.markAsTouched();
    } else if (control instanceof FormGroup) {
      validateAllFields(control);
    } else {
      console.log('Please use Reactive form');
    }
  });
  return formGroup.valid;
};
