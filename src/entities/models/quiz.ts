export class Quiz {
  id: string;
  question: string;
  answer: string;
  choices: string[];
  isAnswered: boolean;
  hint?: string; 

  constructor(
    id: string,
    question: string,
    answer: string,
    choices: string[],
    isAnswered: boolean = false,
    hint?: string
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.choices = choices;
    this.isAnswered = isAnswered;
    this.hint = hint;

    this.validate();
  }

  
  private validate() {
    if (!this.question) throw new Error("Quiz must have a question");
    if (!this.answer) throw new Error("Quiz must have an answer");
    if (!this.choices || this.choices.length < 2) throw new Error("Quiz must have at least 2 choices");
    if (!this.choices.includes(this.answer)) throw new Error("Answer must be one of the choices");
  }

  
  markAnswered() {
    this.isAnswered = true;
  }
}
