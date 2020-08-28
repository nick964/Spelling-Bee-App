import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FetchWordService} from './fetch-word.service';
import {Definition, Word} from './models/word';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'spellingbee';
  wordList = [];

  constructor(public http: HttpClient, public fetchService: FetchWordService) {
  }
  ngOnInit(): void {
  //   this.http.get<string>('assets/text/.txt', { responseType: 'text' as 'json'}).subscribe(res => {
  //     const wordlist = res.split('\n');
  //     wordlist.forEach(word => {
  //       word.replace(/[^a-z0-9\s]/gi, '');
  //       word.replace(/(\r\n|\n|\r)/gm, '');
  //       word.trim();
  //       this.wordList.push(word);
  //     });
  //     const myVar = this.wordList;
  //     console.log('printing as json');
  //
  //   });
  //   console.log(this.wordList);
    this.fetchService.getDefinitionMock('warrior').subscribe(res => {
      const word = new Word();
      if (res != null) {
        console.log(res);
        res.forEach(meta => {
          const newDef = new Definition();
          newDef.partOfSpeech = meta.fl;
          meta.shortdef.forEach(short => {
            newDef.shortDefinition.push(short);
          });
          newDef.example = this.findExampleSentance(meta.def);
          word.definitions.push(newDef);
        });
        console.log(JSON.stringify(word));
        }
    },
      error =>  {
      debugger;
      console.log(error);
      });
    }

    mapToWord(def: any): Definition {
      const word = new Definition();
      return word;

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
