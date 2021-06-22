import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  getoEmbedResponse(url, videoUrl) {
    return this.http.get(url + videoUrl);
  }
}
