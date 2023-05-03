import {
    Question,
    Question_MC,
    Points,
    QuestionCategory,
    Question_Text,
} from "../types/Question";

const defaultMCQuestion = new Question_MC(
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

export const QUESTIONS_DB: { [id: string]: Question } = {
    [QuestionCategory.CATEGORY_1 + "-" + Points.One]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_1 + "-" + Points.Two]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_1 + "-" + Points.Three]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_1 + "-" + Points.Four]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_1 + "-" + Points.Five]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_2 + "-" + Points.One]: new Question_MC(
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
    ),

    [QuestionCategory.CATEGORY_2 + "-" + Points.Two]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_2 + "-" + Points.Three]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_2 + "-" + Points.Four]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_2 + "-" + Points.Five]: defaultMCQuestion,

    [QuestionCategory.CATEGORY_3 + "-" + Points.One]: new Question_Text(
        Points.One,
        QuestionCategory.CATEGORY_3,
        "Reality Is Often Disappointing. Now, Reality Can Be Whatever I Want.",
        "Thanos"
    ),
    [QuestionCategory.CATEGORY_3 + "-" + Points.Two]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_3 + "-" + Points.Three]: new Question_MC(
        Points.Three,
        QuestionCategory.CATEGORY_3,
        "Don't Freeze.",
        { A: "T'Challa", B: "Shuri", C: "M'baku", D: "Okoye" },
        "T'Challa"
    ),
    [QuestionCategory.CATEGORY_3 + "-" + Points.Four]: new Question_Text(
        Points.Four,
        QuestionCategory.CATEGORY_3,
        "Time to Work For a living",
        "Tony Stark"
    ),
    [QuestionCategory.CATEGORY_3 + "-" + Points.Five]: defaultMCQuestion,

    [QuestionCategory.CATEGORY_4 + "-" + Points.One]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_4 + "-" + Points.Two]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_4 + "-" + Points.Three]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_4 + "-" + Points.Four]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_4 + "-" + Points.Five]: defaultMCQuestion,

    [QuestionCategory.CATEGORY_5 + "-" + Points.One]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_5 + "-" + Points.Two]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_5 + "-" + Points.Three]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_5 + "-" + Points.Four]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_5 + "-" + Points.Five]: defaultMCQuestion,
};
