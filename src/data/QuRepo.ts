import {
    Question,
    Question_MC,
    Points,
    QuestionCategory,
    Question_Text,
    defaultMCQuestion,
} from "../types/Question";

export const QUESTIONS_DB: { [id: string]: Question } = {
    [QuestionCategory.CATEGORY_1 + "-" + Points.One]: new Question_Text(
        Points.One,
        QuestionCategory.CATEGORY_1,
        "Where is Wanda from",
        "Sokovia"
    ),
    [QuestionCategory.CATEGORY_1 + "-" + Points.Two]: new Question_Text(
        Points.Two,
        QuestionCategory.CATEGORY_1,
        "Black Widow and Hawkeye often reminisce about this city where they had their first mission together",
        "Budapest"
    ),
    [QuestionCategory.CATEGORY_1 + "-" + Points.Three]: new Question_Text(
        Points.Three,
        QuestionCategory.CATEGORY_1,
        "What borough of New York is Steve Rogers from",
        "Brooklyn"
    ),
    [QuestionCategory.CATEGORY_1 + "-" + Points.Four]: new Question_Text(
        Points.Four,
        QuestionCategory.CATEGORY_1,
        "In Captain America: The Winter Soldier, S.H.I.E.L.D. operates from a central hub. What is the name of the iconic building that serves as S.H.I.E.L.D.'s headquarters in Washington D.C.",
        "The Triskelion"
    ),
    [QuestionCategory.CATEGORY_1 + "-" + Points.Five]: new Question_Text(
        Points.Five,
        QuestionCategory.CATEGORY_1,
        "What is the name of the realm that the Dark Elves are from",
        "Svartalfheim"
    ),

    [QuestionCategory.CATEGORY_2 + "-" + Points.One]: new Question_Text(
        Points.One,
        QuestionCategory.CATEGORY_2,
        "What is the full name of Peggy Carter’s niece",
        "Sharon Carter"
    ),
    [QuestionCategory.CATEGORY_2 + "-" + Points.Two]: new Question_Text(
        Points.Two,
        QuestionCategory.CATEGORY_2,
        "Who made Captain America’s shield",
        "Howard Stark"
    ),
    [QuestionCategory.CATEGORY_2 + "-" + Points.Three]: new Question_Text(
        Points.Three,
        QuestionCategory.CATEGORY_2,
        "What is the full name of the Winter Soldier",
        "James Buchanan Barnes"
    ),
    [QuestionCategory.CATEGORY_2 + "-" + Points.Four]: new Question_Text(
        Points.Four,
        QuestionCategory.CATEGORY_2,
        "What is the name of the scientist who helped create the Super Soldier Serum before being assassinated",
        "Dr. Abraham Erskine"
    ),
    [QuestionCategory.CATEGORY_2 + "-" + Points.Five]: new Question_Text(
        Points.Five,
        QuestionCategory.CATEGORY_2,
        "What is the name of the terrorist group that kidnaps Tony Stark in Iron Man",
        "Ten Rings"
    ),

    [QuestionCategory.CATEGORY_3 + "-" + Points.One]: new Question_Text(
        Points.One,
        QuestionCategory.CATEGORY_3,
        "Do you guys just put the word 'quantum' in front of everything?",
        "Scott Lang"
    ),
    [QuestionCategory.CATEGORY_3 + "-" + Points.Two]: new Question_Text(
        Points.Two,
        QuestionCategory.CATEGORY_3,
        "On your left (in Avengers Endgame)",
        "Sam Wilson"
    ),

    [QuestionCategory.CATEGORY_3 + "-" + Points.Three]: new Question_Text(
        Points.Three,
        QuestionCategory.CATEGORY_3,
        "Dread it, run from it, destiny arives all the same",
        "Thanos"
    ),
    [QuestionCategory.CATEGORY_3 + "-" + Points.Four]: new Question_Text(
        Points.Four,
        QuestionCategory.CATEGORY_3,
        "That's cute. Thanos has a retirement plan.",
        "Tony Stark"
    ),

    [QuestionCategory.CATEGORY_3 + "-" + Points.Five]: new Question_Text(
        Points.Five,
        QuestionCategory.CATEGORY_3,
        "People need to believe, and nowadays, they'll believe anything.",
        "Mysterio"
    ),

    [QuestionCategory.CATEGORY_4 + "-" + Points.One]: new Question_Text(
        Points.One,
        QuestionCategory.CATEGORY_4,
        "What action did Thanos use to wipe out 50% of the universe",
        "A snap"
    ),
    [QuestionCategory.CATEGORY_4 + "-" + Points.Two]: new Question_Text(
        Points.Two,
        QuestionCategory.CATEGORY_4,
        "What is the primary ability granted by the Eye of Agamotto, as used by Doctor Strange",
        "The ability to manipulate time?"
    ),
    [QuestionCategory.CATEGORY_4 + "-" + Points.Three]: new Question_Text(
        Points.Three,
        QuestionCategory.CATEGORY_4,
        "Where did Loki learn his magic from",
        "Frigga"
    ),
    [QuestionCategory.CATEGORY_4 + "-" + Points.Four]: new Question_Text(
        Points.Four,
        QuestionCategory.CATEGORY_4,
        "Doctor Strange has used the Time Stone to view possible futures. How many futures did he see in Avengers: Infinity War",
        "14,000,605"
    ),
    [QuestionCategory.CATEGORY_4 + "-" + Points.Five]: new Question_Text(
        Points.Five,
        QuestionCategory.CATEGORY_4,
        "Name all characters who have wielded Mjolnir",
        "Thor, Jane Foster, Steve Rogers, Vision"
    ),

    [QuestionCategory.CATEGORY_5 + "-" + Points.One]: new Question_MC(
        Points.One,
        QuestionCategory.CATEGORY_5,
        "How many primary color(s) are there?",
        {
            A: "One",
            B: "Two",
            C: "Three",
            D: "Four",
        },
        "Three"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Two]: new Question_MC(
        Points.Two,
        QuestionCategory.CATEGORY_5,
        "In what country is the ancient city of Machu Picchu located?",
        {
            A: "Mexico",
            B: "Peru",
            C: "Egypt",
            D: "Argentina",
        },
        "Peru"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Three]: new Question_MC(
        Points.Three,
        QuestionCategory.CATEGORY_5,
        "In which year did World War I begin?",
        {
            A: "1910",
            B: "1912",
            C: "1914",
            D: "1916",
        },
        "1914"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Four]: new Question_MC(
        Points.Four,
        QuestionCategory.CATEGORY_5,
        "What is the name of the popular musical film starring John Travolta and Olivia Newton-John",
        {
            A: "Singin' in the Rain",
            B: "Grease",
            C: "The Sound of Music",
            D: "West Side Story",
        },
        "Grease"
    ),
    [QuestionCategory.CATEGORY_5 + "-" + Points.Five]: new Question_MC(
        Points.Five,
        QuestionCategory.CATEGORY_5,
        "Which of the following dinosaurs is bird-hipped as opposed to lizard-hipped",
        {
            A: "Apatosaurus",
            B: "Tyrannosaurus Rex",
            C: "Velociraptor",
            D: "Triceratops",
        },
        "Triceratops"
    ),
};
