export class User {
  id: string;
  email: string;
  name: string;
  totalScore: number;
  rank: number;

  constructor(
    id: string,
    email: string,
    name: string,
    totalScore: number,
    rank: number
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.totalScore = totalScore;
    this.rank = rank;
  }
}
