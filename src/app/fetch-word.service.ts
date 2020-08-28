import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchWordService {
   merriemUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
   merriemKey = '?key=46adbba7-5db1-4a5b-a1da-06d7b95b8b62';
   url = 'https://wordsapiv1.p.mashape.com/words/';
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Mashape-Key': '49682ba3edmsh745d1bcfd5dcd07p19d944jsn54702855c35f',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(public http: HttpClient) {

  }



  getWord(word: string) {
    return this.http.get(this.url + word, this.httpOptions);
  }

  getDefinition(word: string) {
    return this.http.get(this.merriemUrl + word + this.merriemKey);
  }

  getDefinitionMock(word: string) {
    return this.http.get<any>('assets/json/epithet.json');
  }
}
