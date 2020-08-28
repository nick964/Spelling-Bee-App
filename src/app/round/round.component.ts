import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {trigger, state, style, animate, transition,} from '@angular/animations';
import {Word} from '../models/word';
import {AngularFireDatabase} from '@angular/fire/database';
import {MyWordService} from '../my-word.service';
import {debug} from 'util';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  isLoaded = false;
  roundKey: string;
  errorOccurred = true;
  errors = [];
  currentWord: Word;
  wordList: Word[];
  usedWordList = [];
  wordMap = new Map();
  usedWordMap = new Map();
  previousIndex = 0;




  constructor(private route: ActivatedRoute, private http: HttpClient,
              private wordService: MyWordService) { }

  ngOnInit() {
    this.roundKey =  this.route.snapshot.params.id;
    if (!this.roundKey) {
      this.errorOccurred = true;
      this.errors.push('Error: No Round info loaded, please try again');
    } else if (this.roundKey === 'test') {
        this.wordService.getSavedWords('/testround').then(res => {
          if (res && res.length > 0) {
            debugger;
            console.log(res);
            this.wordList = res;
            this.isLoaded = true;
          }
        });
    } else {
      this.wordService.getSavedWords('/round' + this.roundKey).then(res => {
        if (res && res.length > 0) {
          console.log(res);
          this.wordList = res;
          this.wordList = this.wordList.filter(word => word.definitions.length > 0);
          this.isLoaded = true;
        }
      });
    }
  }

  grabSpellingWord() {
    if (this.isLoaded && this.wordList.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        const word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.wordList.splice(randomIndex, 1);
        this.usedWordList.push(word);
        this.currentWord = word;
        this.previousIndex = this.usedWordList.length - 1;
    }
    if (this.wordList.length === 0) {

    }
  }

  grabPrevious() {
    if (!(this.usedWordList.length === 0)) {
      if (this.previousIndex > 0) {
        this.previousIndex--;
        this.currentWord = this.usedWordList[this.previousIndex];
      } else if (this.previousIndex === 0) {
        this.previousIndex = this.usedWordList.length - 1;
        this.currentWord = this.usedWordList[this.usedWordList.length - 1];
      }
    }
  }

}
