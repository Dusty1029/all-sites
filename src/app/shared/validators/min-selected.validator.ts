import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minSelected(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!Array.isArray(value)) return { invalidArray: true };
        return value.length >= min
            ? null
            : { minSelected: { required: min, actual: value.length } };
    };
}
