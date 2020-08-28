export class Definition {
  shortDefinition: string[];
  partOfSpeech: string;
  example: string;

  constructor() {
    this.shortDefinition = [];
  }
}

export class Word {
  wordValue: string;
  key: string;
  definitions: Definition[];

  constructor() {
    this.definitions = [];
  }
}


