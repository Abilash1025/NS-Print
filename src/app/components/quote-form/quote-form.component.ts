import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SERVICES } from '../../data/services';
import { COMPANY, WHATSAPP_URL } from '../../data/company';

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

    const value = this.form.getRawValue();
    const serviceName =
      this.services.find((s) => s.slug === value.service)?.name || value.service;

    const lines = [
      `Hello ${COMPANY.name}, I would like a print quote.`,
      '',
      `Name: ${value.name}`,
      value.company ? `Company: ${value.company}` : null,
      `Email: ${value.email}`,
      `Phone: ${value.phone}`,
      `Service: ${serviceName}`,
      value.quantity ? `Quantity: ${value.quantity}` : null,
      value.deadline ? `Deadline: ${value.deadline}` : null,
      '',
      'Message:',
      value.message
    ].filter((line): line is string => line !== null);

    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');

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
