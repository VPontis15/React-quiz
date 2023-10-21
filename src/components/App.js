import { useEffect, useReducer } from "react";
import "../index";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start": {
      return { ...state, status: "active" };
    }
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numOfQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
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
        {status === "active" && <Question questions={questions[index]} />}
      </Main>
    </div>
  );
}
