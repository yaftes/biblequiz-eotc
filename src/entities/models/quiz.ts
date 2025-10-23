export class Quiz {
    
  id: string;
  question: string;
  answer: string;
  choices: string[];
  category : string;
  hint?: string; 
  point : number

  constructor(
    id: string,
    question: string,
    answer: string,
    choices: string[],
    category : string,
    point : number,
    hint?: string,
    
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.choices = choices;
    this.hint = hint;
    this.category = category;
    this.point = point;

  }

}
