import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpan',
  standalone: true
})
export class TimeSpanPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    const parts = value.split('.');

    if (parts.length !== 2) {
      return value; // pas de ms → on laisse tel quel
    }

    const [time, ms] = parts;

    // garde seulement les 3 premiers digits des ms
    const trimmedMs = ms.substring(0, 3);

    return `${time}.${trimmedMs}`;
  }
}