const Loading = () => {
  return (
    <div className="Loading">
      <div className="Loading-text">
        <span style={{ color: "orange" }}>Loading Please Wait...</span>
      </div>
      <div className="Loading-image">
        <img
          src="https://media3.giphy.com/media/feN0YJbVs0fwA/giphy.gif?cid=ecf05e47ckcp4zuvowjk37uy4pln4ir3cxxopqci3i9wf86h&rid=giphy.gif&ct=g"
          alt="Loading"
        />
      </div>
    </div>
  );
};

export default Loading;
