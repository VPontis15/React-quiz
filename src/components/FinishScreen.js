function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <>
      <div>
        <p className="result">
          You scored {points} / {maxPoints} ({Math.ceil(percentage)}%)
        </p>
        <h4>Highscore: {highscore}</h4>
      </div>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
