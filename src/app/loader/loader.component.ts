import { Component, OnInit } from '@angular/core';
import {MyWordService} from '../my-word.service';
import {MapperService} from '../mapper.service';
import {FetchWordService} from '../fetch-word.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private saver: MyWordService, private mapper: MapperService,
              private fetch: FetchWordService, private http: HttpClient) { }
  wordList = [];
  ngOnInit() {
  }

  loadFirstGrade() {
    this.http.get<Array<string>>('assets/json/grade1.json').subscribe(res => {
      console.log(res);
      debugger;
      this.wordList = res;
      this.wordList.forEach(word => {
        this.fetch.getDefinitionMock(word).subscribe(wordDefinition => {
          const wordResult = this.mapper.mapResponseToMyWord(word, wordDefinition);
          if (wordResult.definitions && wordResult.definitions.length > 0) {
            this.saver.saveWord(wordResult, '1');
          }
        });
      });
    });
  }

  loadRound(roundNum: string) {
    this.http.get<Array<string>>('assets/json/round' + roundNum + '.json').subscribe(res => {
      debugger;
      console.log(res);
      this.wordList = res;
      this.wordList.forEach(word => {
        this.fetch.getDefinition(word).subscribe(wordDefinition => {
          const wordResult = this.mapper.mapResponseToMyWord(word, wordDefinition);
          if (wordResult.definitions && wordResult.definitions.length > 0) {
            this.saver.saveWord(wordResult, roundNum);
          }
        });
      });
    });
  }

}
