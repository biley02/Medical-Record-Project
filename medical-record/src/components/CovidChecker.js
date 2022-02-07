import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../context/Context";

import arr from "../Quizzes/quizzes";

// import "../styles/userProfile.css";
import "../styles/quiz.css";

let opt = [-1, -1, -1, -1, -1, -1];
const size = 5;
const CovidChecker = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quiz, setQuiz] = useState(arr[questionNumber].text);
  const [options, setOptions] = useState(arr[questionNumber].options);
  const [answer, setAnswer] = useState([-1, -1, -1, -1, -1, -1, -1, -1]);
  const [selected, setSelected] = useState(-1);
  const [answered, setAnswered] = useState(0);
  const [status, setStatus] = useState("");

  const { Alert, alert, setAlert, showAlert, userToken } = useGlobalContext();

  useEffect(() => {
    setQuiz(arr[questionNumber].text);
    setSelected(opt[questionNumber]);
  });

  const nextQuestion = async () => {
    if (selected == -1) {
      showAlert(true, "danger", "All the questions are compulsory");
      return;
    }
    if (questionNumber < size - 1) {
      setQuestionNumber(questionNumber + 1);

      //   setQuiz(arr[questionNumber].text);
    } else {
      return;
    }
  };

  const prevQuestion = () => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);

      //   setQuiz(arr[questionNumber].text);
    } else {
      return;
    }
  };

  const selectOption = (id) => {
    if (selected === -1) setAnswered(answered + 1);
    setSelected(id);
    opt[questionNumber] = id;
  };

  const checkQuiz = () => {
    // console.log("question number", questionNumber);
    if (questionNumber !== size - 1) {
      showAlert(true, "danger", "Answer all the questions first");
      return;
    }

    let res = 0;
    opt.map((data, id) => {
      if (id == 0) {
        if (data == 0) res = res + 3;
      }
      if (id == 1) {
        if (data == 0) res = res + 3;
      }
      if (id == 2) {
        if (data == 0) res = res + 3;
      }
      if (id == 3) {
        if (data == 0) res = res + 3;
      }
      if (id == 4) {
        if (data == 0) res = res + 3;
      }
    });

    res = res / 5;

    if (res >= 3) {
      setStatus("Visit hospital");
    } else {
      setStatus("Good ");
    }
  };
  return (
    <div className="col-lg-8 col-sm-8 col-12 order-1 order-sm-2" id="pSec2">
      <div id="sub1">
        <div className="disease-back-link">
          <a href="/user/profile">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>Self-Checker
          </a>
        </div>
        {!status ? (
          <div className="quiz-container">
            <div className="questions-answered">
              <i
                className="fa fa-angle-left left-right "
                aria-hidden="true"
                onClick={() => {
                  prevQuestion();
                }}
              ></i>
              <p className="correct-answers">
                questions answered : {answered}/{size}
              </p>
              <i
                className="fa fa-angle-right left-right "
                aria-hidden="true"
                onClick={() => {
                  nextQuestion();
                }}
              ></i>
            </div>

            <p>{quiz}</p>
            <div className="quiz-options">
              {options.map((data, id_btn) => {
                return (
                  //   <div className="options">
                  <button
                    className={
                      selected !== id_btn ? "submit-button" : "selected"
                    }
                    id={id_btn}
                    onClick={() => selectOption(id_btn)}
                  >
                    {data}
                  </button>
                  //   </div>
                );
              })}
            </div>
            <button className="submit-quiz" onClick={() => checkQuiz()}>
              Finish Quiz
            </button>
          </div>
        ) : (
          <div className="quiz-container">
            <p>{status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CovidChecker;
