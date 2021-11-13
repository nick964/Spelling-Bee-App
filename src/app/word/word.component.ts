import {Component, Input, OnInit} from '@angular/core';
import {Word} from '../models/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() spellingWord: string | null;

  @Input() word: Word;

  constructor() { }

  ngOnInit() {
  }


  goToLink(word: string){
    const val = 'https://www.google.com/search?q=' + word + '%20definition';
    window.open(val, '_blank');
  }

}
