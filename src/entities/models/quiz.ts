export class Quiz {
    
  id: string;
  question: string;
  answer: string;
  choices: string[];
  isAnswered: boolean;
  category : string;
  hint?: string; 

  constructor(
    id: string,
    question: string,
    answer: string,
    choices: string[],
    isAnswered: boolean = false,
    category : string,
    hint?: string
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.choices = choices;
    this.isAnswered = isAnswered;
    this.hint = hint;
    this.category = category;

  }

  

}
