import "../index";

function Options({ questions, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <>
      {questions.options.map((option, i) => (
        <button
          key={option}
          onClick={() => dispatch({ type: "showAnswer", payload: i })}
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered
              ? i === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
