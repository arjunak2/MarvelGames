"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Points = exports.Question_Text = exports.Question_MC = exports.Question = exports.QuestionCategory = exports.QuestionType = void 0;
var QuestionType;
(function (QuestionType) {
    QuestionType["MULTIPLE"] = "multiple";
    QuestionType["TEXT"] = "text";
    QuestionType["NULL"] = "";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var QuestionCategory;
(function (QuestionCategory) {
    QuestionCategory["CATEGORY_1"] = "Not Just a Place";
    QuestionCategory["CATEGORY_2"] = "Secret Identities";
    QuestionCategory["CATEGORY_3"] = "Avengers Assemble";
    QuestionCategory["CATEGORY_4"] = "Powers";
    QuestionCategory["CATEGORY_5"] = "Quantumania";
})(QuestionCategory = exports.QuestionCategory || (exports.QuestionCategory = {}));
/**
 * // Using the Levenshtern  method to calculate distance between two strings
 * @param s First String
 * @param t String we are comparing too
 * @returns distance number
 */
var levenshteinDistance = function (s, t) {
    var str1 = s.toLocaleLowerCase();
    var str2 = t.toLocaleLowerCase();
    if (!str1.length)
        return str2.length;
    if (!str2.length)
        return str1.length;
    var arr = [];
    for (var i = 0; i <= str2.length; i++) {
        arr[i] = [i];
        for (var j = 1; j <= str1.length; j++) {
            arr[i][j] =
                i === 0
                    ? j
                    : Math.min(arr[i - 1][j] + 1, arr[i][j - 1] + 1, arr[i - 1][j - 1] +
                        (str1[j - 1] === str2[i - 1] ? 0 : 1));
        }
    }
    return arr[str2.length][str1.length];
};
var Question = /** @class */ (function () {
    function Question(points, category, query, answer) {
        this.points = points;
        this.category = category;
        this.query = query;
        this.answer = answer;
        this.type = QuestionType.NULL;
        this.isAnswered = false;
        this.id = "".concat(category, "-").concat(points);
    }
    Question.prototype.validateAnswer = function (chosenAnswer) {
        var editDistance = levenshteinDistance(this.answer, chosenAnswer);
        return editDistance <= 2;
    };
    Question.prototype.updateScore = function (score) {
        console.log("Updating player score to ".concat(score));
    };
    return Question;
}());
exports.Question = Question;
var Question_MC = /** @class */ (function (_super) {
    __extends(Question_MC, _super);
    function Question_MC(points, category, query, choices, answer) {
        var _this = _super.call(this, points, category, query, answer) || this;
        _this.type = QuestionType.MULTIPLE;
        _this.choices = choices;
        return _this;
    }
    return Question_MC;
}(Question));
exports.Question_MC = Question_MC;
var Question_Text = /** @class */ (function (_super) {
    __extends(Question_Text, _super);
    function Question_Text(points, category, query, answer) {
        var _this = _super.call(this, points, category, query, answer) || this;
        _this.type = QuestionType.TEXT;
        return _this;
    }
    return Question_Text;
}(Question));
exports.Question_Text = Question_Text;
var Points;
(function (Points) {
    Points[Points["One"] = 100] = "One";
    Points[Points["Two"] = 200] = "Two";
    Points[Points["Three"] = 300] = "Three";
    Points[Points["Four"] = 400] = "Four";
    Points[Points["Five"] = 500] = "Five";
})(Points = exports.Points || (exports.Points = {}));
