export interface IUser {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  points: Array<{
    language: string;
    coins: number;
  }>;
  dob: string;
  age: number;
  gender: string;
  city: string;
  country: string;
  whyLearning: string;
  knownThrough: string;
  dailyGoal: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  isAdmin: boolean;
  name: string;
}

export interface params {
  id: string;
}

export interface vocabType {
  language: string;
  level: string;
  hindiInHindi: string;
  englishInEnglish: string;
  languageInHindi: string;
  languageInEnglish: string;
  languageInLanguage: string;
  image: string;
  audio: string;
}

export interface vocabBodyType {
  language: string;
  level: string;
  hindiInHindi: string;
  englishInEnglish: string;
  languageInHindi: string;
  languageInEnglish: string;
  languageInLanguage: string;
}

interface levelData {
  level: string;
  learning: Array<string>;
  reviewing: Array<string>;
  mastered: Array<string>;
}

export interface ILeitner {
  userId: string;
  data: Array<{
    language: string;
    levelData: Array<levelData>;
  }>;
  progress: Array<{
    language: string;
    wordsLearned: number;
    date: Date;
  }>;
  totalWordsLearned: Array<{
    language: string;
    totalMastered: number;
  }>;
}

export interface initLeitner {
  userId: string;
  language: string;
  level: string;
}

export interface postLeitner {
  userId: string;
  level: string;
  language: string;
  wordId: string;
  status: number;
}

export interface getLeitnerDataParams {
  userId: string;
  language: string;
  level: string;
}

export interface questionType {
  question: string;
  options: Array<{
    option: string;
    isCorrect: boolean;
  }>;
  language: string;
  level: string;
  time: number;
}

export interface genQuiz {
  language: string;
  level: string;
  size: number;
}

export interface resultType {
  userId: string;
  language: string;
  level: string;
  attemps: Array<{
    score: number;
    date: Date;
    quizData: Array<{
      question: string;
      userAns: string;
      rightAns: string;
      timeTaken: number;
    }>;
  }>;
}

export interface addQuiz {
  userId: string;
  language: string;
  level: string;
  score: number;
  data: Array<{
    question: string;
    userAns: string;
    rightAns: string;
    timeTaken: number;
  }>;
}

export interface getQuiz {
  userId: string;
  language: string;
  level: string;
}

export interface langType {
  language: string;
  levels: Array<string>;
}

export interface addCat {
  language: string;
  newLevel: string;
}

export interface feedType {
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
}
