function ProgressBar({ index, numOfQuestions, maxPoints, points, answer }) {
  return (
    <header>
      <progress
        value={index + Number(answer !== null)}
        max={numOfQuestions}
      ></progress>
      <p>
        {" "}
        Question <strong>{index + 1}</strong>/ {numOfQuestions}
      </p>
      <p>
        Points {points} / {maxPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
