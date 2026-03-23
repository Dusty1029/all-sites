import { AbstractControl, ValidationErrors } from '@angular/forms';

export function timeWithMsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    // Regex HH:mm:ss.SSS
    const regex = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/;
    const match = value.match(regex);

    if (!match) {
        return { invalidFormat: true };
    }

    const [, h, m, s, ms] = match.map(Number);

    console.log(h, m, s, ms)

    if (h > 23 || m > 59 || s > 59 || ms > 999) {
        return { invalidTime: true };
    }

    return null;
}
