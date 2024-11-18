import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-pdf',
  templateUrl: './student-pdf.component.html',
  styleUrls: ['./student-pdf.component.scss'],
})
export class StudentPdfComponent implements OnInit {

  @Input() pdfUrl: string | undefined;
  sanitizedPdfUrl!: SafeResourceUrl

  constructor(private modalController: ModalController, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sanitizePdfUrl();
  }

  sanitizePdfUrl() {
    this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
  }

  close() {
    this.modalController.dismiss();
  }

}
