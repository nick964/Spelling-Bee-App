import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchWordService {
   merriemUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(public http: HttpClient) {

  }




  getDefinition(word: string) {
    return this.http.get(this.merriemUrl + word + environment.merriemKey);
  }

  getDefinitionMock(word: string) {
    return this.http.get<any>('assets/json/epithet.json');
  }
}
