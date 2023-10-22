import Options from "./Options";
import "../index";

function Question({ questions, answer, dispatch }) {
  return (
    <div className="options">
      <h4>{questions.question}</h4>
      <Options answer={answer} dispatch={dispatch} questions={questions} />
    </div>
  );
}

export default Question;
