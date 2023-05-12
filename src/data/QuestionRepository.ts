import {
    Question,
    Question_MC,
    Points,
    QuestionCategory,
    Question_Text,
    defaultMCQuestion,
} from "../types/Question";

export const QUESTIONS_DB: { [id: string]: Question } = {
    [QuestionCategory.CATEGORY_1 + "-" + Points.One]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_1 + "-" + Points.Two]: defaultMCQuestion,
    [QuestionCategory.CATEGORY_1 + "-" + Points.Three]: new Question_MC(
        Points.Three,
        QuestionCategory.CATEGORY_1,
        "What planet is Thanos from?",
        {
            A: "Sakaar",
            B: "Titan",
            C: "Warworld",
            D: "Hala",
        },
        "Titan"
    ),
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
    [QuestionCategory.CATEGORY_2 + "-" + Points.Four]: new Question_MC(
        Points.Four,
        QuestionCategory.CATEGORY_2,
        "Which marvel character did Taylor Swift almost play?",
        {
            A: "Emma Frost",
            B: "Agent 13",
            C: "Invisible Woman",
            D: "Dazzler",
        },
        "Dazzler"
    ),
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

    [QuestionCategory.CATEGORY_5 + "-" + Points.One]: new Question_MC(
        Points.One,
        QuestionCategory.CATEGORY_5,
        "What is the protein in your red blood cells that gives it its red color",
        {
            A: "Platlets",
            B: "Lipids",
            C: "Fibronectin",
            D: "Hemoglobin",
        },
        "Hemoglobin"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Two]: new Question_MC(
        Points.Two,
        QuestionCategory.CATEGORY_5,
        "Which bridge, was the longest in the world when it was built in 1937 and was featured in movies like X-men.",
        {
            A: "Golden Gate Bridge",
            B: "Tower Bridge",
            C: "Brooklyn Bridge",
            D: "Chicago Bridge",
        },
        "Golden Gate Bridge"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Three]: new Question_MC(
        Points.Three,
        QuestionCategory.CATEGORY_5,
        "Which fruit accounts for 50% of the world's deciduous fruit tree production",
        {
            A: "Mangoes",
            B: "Apples",
            C: "Blueberries",
            D: "Cranberries",
        },
        "Apples"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Four]: new Question_MC(
        Points.Four,
        QuestionCategory.CATEGORY_5,
        "Which bird is the State bird of 7 states including Ohio and North Carolina",
        {
            A: "Robin",
            B: "Cardinal",
            C: "Western Meadowlark",
            D: "Mockingboard",
        },
        "Cardinal"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Five]: new Question_MC(
        Points.Five,
        QuestionCategory.CATEGORY_5,
        "In 2002 which fictional character testified in congress before the education subcommittee to seek support for funding musical education.",
        {
            A: "Elmo",
            B: "Mr. Rogers",
            C: "Spongebob",
            D: "Mary Poppins",
        },
        "Elmo"
    ),
};
