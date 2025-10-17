export class Streak {
  id: string;
  userId: string;
  currentCount: number;    
  longestCount: number;    
  lastUpdated: Date;       

  constructor(
    id: string,
    userId: string,
    currentCount: number = 0,
    longestCount: number = 0,
    lastUpdated: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.currentCount = currentCount;
    this.longestCount = longestCount;
    this.lastUpdated = lastUpdated;

    this.validate();
  }

  
  private validate() {
    if (!this.userId) throw new Error("Streak must belong to a user");
    if (this.currentCount < 0) throw new Error("Current streak cannot be negative");
    if (this.longestCount < 0) throw new Error("Longest streak cannot be negative");
  }

  
  increment() {
    this.currentCount += 1;
    if (this.currentCount > this.longestCount) {
      this.longestCount = this.currentCount;
    }
    this.lastUpdated = new Date();
  }

  
  reset() {
    this.currentCount = 0;
    this.lastUpdated = new Date();
  }
}
