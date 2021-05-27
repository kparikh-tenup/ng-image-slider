import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  getoEmbedResponse(videoUrl) {
   // videoUrl = 'https%3A//vimeo.com/286898202&width=480&height=360';
   console.log('https://vimeo.com/api/oembed.json?url=' + videoUrl)
    return this.http.get('https://vimeo.com/api/oembed.json?url=' + videoUrl);
  }
}
