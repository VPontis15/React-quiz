import Options from "./Options";
import "./index";

function Question({ questions }) {
  return (
    <div className="options">
      <h4>{questions.question}</h4>
      <Options questions={questions} />
    </div>
  );
}

export default Question;
