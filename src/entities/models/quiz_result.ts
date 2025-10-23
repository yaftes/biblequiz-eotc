class QuizResult {
  userId: string;
  quizId: string;
  is_answered: boolean;
  numberOfTrial : number;

  constructor(userId: string, quizId: string, is_answered: boolean,numberOfTrial:number) {
    this.userId = userId;
    this.quizId = quizId;
    this.is_answered = is_answered;
    this.numberOfTrial = numberOfTrial;
  }
}
