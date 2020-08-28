import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Word} from './models/word';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyWordService {

  items: Observable<any>;
  words: Word[] = [];

  constructor(public db: AngularFireDatabase) { }


  saveWord(word: Word, round: string) {
    this.db.list('round' + round + '/').push(word).then(res => {
      console.log(res);
  });
}

    getSavedWords(round: string): Promise<Word[]> {
      return new Promise<Word[]>(resolve => {
        this.items = this.db.list(round)
          .snapshotChanges()
          .pipe(map(items => {             // <== new way of chaining
            return items.map(a => {
              const data = a.payload.val();
              const key = a.payload.key;
              return {key, data};           // or {key, ...data} in case data is Obj
            });
          }));

        this.items.subscribe(vals => {
          vals.forEach(value => {
            const werd: Word = value.data;
            werd.key = value.key;
            this.cleanExample(werd);
            this.words.push(werd);
          });
          resolve(this.words);
          });
        });
      }

      private cleanExample(word: Word) {
      if(word && word.definitions) {
        word.definitions.forEach(def => {
          if (def.example && def.example.length > 0) {
            def.example = def.example.replace('{wi}', '');
            def.example = def.example.replace('{\\/wi}', '');
          }
        });
      }

      }
}
