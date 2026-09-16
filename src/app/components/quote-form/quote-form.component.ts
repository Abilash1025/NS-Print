import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SERVICES } from '../../data/services';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent {
  readonly services = SERVICES;
  readonly submitted = signal(false);
  readonly form;

  constructor(fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      service: ['', Validators.required],
      quantity: [''],
      deadline: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Frontend-only demo submission — no backend send
    this.submitted.set(true);
    this.form.reset();
  }

  resetSuccess(): void {
    this.submitted.set(false);
  }

  hasError(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && c.touched;
  }
}
