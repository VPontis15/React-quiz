function NextButton({ dispatch, answer, index, numOfQuestions }) {
  if (answer === null) return;
  if (index < numOfQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  if (index === numOfQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finished" })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
}

export default NextButton;
