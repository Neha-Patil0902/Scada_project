import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Converter } from '../models/converter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusConfiguration {
  
    private dataUrl = 'http://localhost:3002/converters';

  constructor(private http: HttpClient) {}

  // GET all converters
  getConverters(): Observable<Converter[]> {
    return this.http.get<Converter[]>(this.dataUrl);
  }

  // UPDATE one converter
  updateConverter(conv: Converter): Observable<Converter> {
    return this.http.put<Converter>(`${this.dataUrl}/${conv.id}`, conv);
  }
   addConverter(conv: Converter): Observable<Converter> {
    return this.http.post<Converter>(this.dataUrl, conv);
  }

  deleteConverter(id: number) {
  return this.http.delete<Converter>(`${this.dataUrl}/converters/${id}`);
}

}
