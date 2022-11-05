import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  transform(url: string): Observable<any> {

    return this.http.get(url,
      {
        responseType: 'blob'
      }).pipe(
        map((x: any) => {
          var blob = new Blob([x], { type: 'application/octet-stream' });
          let downloadURL = window.URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(downloadURL);
        }),
        catchError(err => of([]))
      );
  }
}
