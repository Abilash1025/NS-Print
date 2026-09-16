import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { COMPANY, MAIL_URL, TEL_URL, WHATSAPP_URL } from '../../data/company';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [QuoteFormComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {
  readonly company = COMPANY;
  readonly tel = TEL_URL;
  readonly mail = MAIL_URL;
  readonly whatsapp = WHATSAPP_URL;
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact & Quote | NS Print Mart');
    this.meta.updateTag({
      name: 'description',
      content: 'Get a quote from NS Print Mart. Call, WhatsApp, or send a print request.'
    });
  }
}
