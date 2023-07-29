import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** A hero's name can't match the given regular expression */
export function reservedNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reserved = RegExp('alexander').test(control.value);

    return reserved ? { reservedName: { value: control.value } } : null;
  };
}
