import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, MAIL_URL, TEL_URL } from '../../data/company';
import { NAV_LINKS } from '../../data/navigation';
import { SERVICES } from '../../data/services';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly company = COMPANY;
  readonly links = NAV_LINKS;
  readonly services = SERVICES.slice(0, 8);
  readonly mailUrl = MAIL_URL;
  readonly telUrl = TEL_URL;
  readonly year = new Date().getFullYear();
}
