import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import * as jsPDF from 'jspdf';

/**
 * This is the jsPDF type, but with more of its methods exposed.
 *
 * jspdf, the library, clearly distinguishes between its public API and its
 * private, internal API.
 *
 * Now, the @types/jspdf module, which provides type declarations for using
 * jspdf in TypeScript, chooses not to expose methods of the jsPDF class
 * that are part of the public API, but that don't have any documentation.
 *
 * This is the wrong decision; those methods are designated for public use and
 * should not be hidden just because their documentation is incomplete.
 *
 * So, here, we declare a new TypeScript type that includes all of the methods
 * declared in @types/jspdf, plus certain methods that @types/jspdf hides, but
 * that we use here anyway.
 */
export type RealJsPDF = jsPDF & {
  getNumberOfPages: () => number,
  getCurrentPageInfo: () => {
    pageContext: {
      mediaBox: {
        bottomLeftX: number,
        bottomLeftY: number,
        topRightX: number,
        topRightY: number,
      },
    },
  },
};

@Injectable()
export class PDFService {
  constructor() {
  }

  /**
   * Returns a jsPDF object with a link to Professor Rachel's
   * DoorBoard viewer page.
   */
  getPDF(): RealJsPDF {
    const url: string = environment.BASE_URL + '/viewer';

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    }) as RealJsPDF;

    doc.setFontSize(18);
    doc.text('Rachel Johnson\'s DoorBoard', (8.5 / 2), 0.5, { align: 'center' });
    // TODO: hook up the production IP address for deployment.
    doc.text(url, (8.5 / 2), 1, { align: 'center' });

    return doc;
  }
}
