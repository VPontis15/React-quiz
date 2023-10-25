import { useEffect, useReducer } from "react";
import "../index";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuestions } from "../Contexts/useQuestions";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaing: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start": {
      const Secs = 30;
      return {
        ...state,
        status: "active",
        secondsRemaing: state.questions.length * Secs,
      };
    }
    case "tick":
      return { ...state, secondsRemaing: state.secondsRemaing - 1 };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "showAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaing },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((sum, curr) => (sum += curr.points), 0);

  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              points={points}
              maxPoints={maxPoints}
              numOfQuestions={numOfQuestions}
              answer={answer}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              questions={questions[index]}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaing} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numOfQuestions={numOfQuestions}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            highscore={highscore}
            points={points}
            maxPoints={maxPoints}
          />
        )}
      </Main>
    </div>
  );
}
