import { plainToClass } from "class-transformer";
import { v4 as uuidv4 } from "uuid";
export enum QuestionType {
    MULTIPLE = "multiple",
    TEXT = "text",
    NULL = "",
}
export enum QuestionCategory {
    CATEGORY_1 = "Not Just a Place",
    CATEGORY_2 = "Secret Identities",
    CATEGORY_3 = "Avengers Assemble",
    CATEGORY_4 = "Powers",
    CATEGORY_5 = "Quantumania",
}

/**
 * // Using the Levenshtern  method to calculate distance between two strings
 * @param s First String
 * @param t String we are comparing too
 * @returns distance number
 */
const levenshteinDistance = (s: string, t: String): number => {
    const str1 = s.toLocaleLowerCase();
    const str2 = t.toLocaleLowerCase();
    if (!str1.length) return str2.length;
    if (!str2.length) return str1.length;
    const arr = [];
    for (let i = 0; i <= str2.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= str1.length; j++) {
            arr[i][j] =
                i === 0
                    ? j
                    : Math.min(
                          arr[i - 1][j] + 1,
                          arr[i][j - 1] + 1,
                          arr[i - 1][j - 1] +
                              (str1[j - 1] === str2[i - 1] ? 0 : 1)
                      );
        }
    }
    return arr[str2.length][str1.length];
};

export abstract class Question {
    id: string;
    type: QuestionType = QuestionType.NULL;
    isAnswered = false;
    constructor(
        public points: Points,
        public category: QuestionCategory,
        public query: string,
        public answer: string
    ) {
        this.id = `${category}-${points}`;
    }
    validateAnswer(chosenAnswer: string): boolean {
        const editDistance = levenshteinDistance(this.answer, chosenAnswer);
        return editDistance <= 2;
    }
    updateScore(score: number) {
        console.log(`Updating player score to ${score}`);
    }
}
export function mapJsonToQuestion(json: Question) {
    const QUESTION_CLASS =
        json.type === QuestionType.MULTIPLE ? Question_MC : Question_Text;
    return plainToClass(QUESTION_CLASS, json);
}

interface MCChoices {
    A: string;
    B: string;
    C: string;
    D: string;
}

export class Question_MC extends Question {
    choices: MCChoices;
    constructor(
        points: Points,
        category: QuestionCategory,
        query: string,
        choices: MCChoices,
        answer: string
    ) {
        super(points, category, query, answer);
        this.type = QuestionType.MULTIPLE;
        this.choices = choices;
    }
}

export class Question_Text extends Question {
    constructor(
        points: Points,
        category: QuestionCategory,
        query: string,
        answer: string
    ) {
        super(points, category, query, answer);
        this.type = QuestionType.TEXT;
    }
}

export enum Points {
    One = 100,
    Two = 200,
    Three = 300,
    Four = 400,
    Five = 500,
}

export const defaultMCQuestion = new Question_MC(
    Points.One,
    QuestionCategory.CATEGORY_2,
    "Which movie did Wong NOT appear in?",
    {
        A: "She-hulk",
        B: "Shang-Chi",
        C: "Eternals",
        D: "No Way Home",
    },
    "Eternals"
);

export const defaultTextQuestion = new Question_Text(
    Points.One,
    QuestionCategory.CATEGORY_1,
    "",
    ""
);
