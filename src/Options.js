import "./index";

function Options({ questions }) {
  return (
    <>
      {questions.options.map((option) => (
        <button key={option} className="btn btn-option">
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
