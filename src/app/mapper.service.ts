import { Injectable } from '@angular/core';
import {Definition, Word} from './models/word';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapResponseToMyWord(wordValue: string, res: any): Word {
    const word = new Word();
    word.wordValue = wordValue;
    if (res != null) {
      console.log(res);
      res.forEach(meta => {
        const newDef = new Definition();
        newDef.partOfSpeech = meta.fl;
        if (meta.shortdef) {
          meta.shortdef.forEach(short => {
            newDef.shortDefinition.push(short);
          });
        } else {
          console.log('No short def found, ');
          console.log(newDef);
        }

        newDef.example = this.findExampleSentance(meta.def);
        word.definitions.push(newDef);
      });
      console.log(JSON.stringify(word));
      return word;
    } else {
      console.log('ERROR: response is null, please check');
      return new Word();
    }
  }

  findExampleSentance(def: any): string {
    if (def[0] && def[0].sseq && def[0].sseq[0] && def[0].sseq[0][0] &&
      def[0].sseq[0][0][1] && def[0].sseq[0][0][1].dt && def[0].sseq[0][0][1].dt[1] &&
      def[0].sseq[0][0][1].dt[1][0] && def[0].sseq[0][0][1].dt[1][0]  === 'vis' &&
      def[0].sseq[0][0][1].dt[1][1] && def[0].sseq[0][0][1].dt[1][1][0] &&
      def[0].sseq[0][0][1].dt[1][1][0].t) {
      return def[0].sseq[0][0][1].dt[1][1][0].t;
    }
    return '';

  }
}
