import { Component, ElementRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { SERVICES } from '../../data/services';
import { COMPANY, WHATSAPP_URL } from '../../data/company';

function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const raw = String(control.value ?? '').trim();
  if (!raw) {
    return null;
  }
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return { phone: true };
  }
  return null;
}

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
  readonly showErrors = signal(false);
  readonly form;

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor(fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator]],
      service: ['', Validators.required],
      quantity: [''],
      deadline: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
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

    this.showErrors.set(false);
    this.submitted.set(true);
    this.form.reset();
  }

  resetSuccess(): void {
    this.submitted.set(false);
    this.showErrors.set(false);
  }

  hasError(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || this.showErrors());
  }

  errorMessage(control: string): string {
    const c = this.form.get(control);
    if (!c || !c.errors) {
      return '';
    }

    switch (control) {
      case 'name':
        if (c.errors['required']) {
          return 'Please enter your name.';
        }
        if (c.errors['minlength']) {
          return 'Name should be at least 2 characters.';
        }
        return 'Please enter a valid name.';
      case 'email':
        if (c.errors['required']) {
          return 'Please enter your email address.';
        }
        if (c.errors['email']) {
          return 'Enter a valid email, like name@company.com.';
        }
        return 'Please enter a valid email.';
      case 'phone':
        if (c.errors['required']) {
          return 'Please enter your phone number.';
        }
        if (c.errors['phone']) {
          return 'Enter a valid phone number (7–15 digits).';
        }
        return 'Please enter a valid phone number.';
      case 'service':
        return 'Please select what you need printed.';
      case 'message':
        if (c.errors['required']) {
          return 'Please tell us a bit about your print job.';
        }
        if (c.errors['minlength']) {
          return 'Add a little more detail (at least 10 characters).';
        }
        return 'Please add a short message.';
      default:
        return 'Please check this field.';
    }
  }

  missingLabels(): string[] {
    const labels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service',
      message: 'Message'
    };

    return Object.keys(labels).filter((key) => {
      const c = this.form.get(key);
      return !!c && c.invalid;
    }).map((key) => labels[key]);
  }

  private focusFirstInvalid(): void {
    const order = ['name', 'email', 'phone', 'service', 'message'];
    const first = order.find((key) => this.form.get(key)?.invalid);
    if (!first) {
      return;
    }

    const el = this.host.nativeElement.querySelector(
      `[formcontrolname="${first}"]`
    ) as HTMLElement | null;

    el?.focus();
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
