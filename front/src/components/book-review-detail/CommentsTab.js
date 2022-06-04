export const CommentsTab = ({ comments }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="pt-1">
            <p className="fw-bold fs-4">Comments </p>
          </div>
          <div style={{ overflowY: "scroll", height: "20vh" }}>
            {comments.map((val) => (
              <li className="pb-3 pt-2">{val}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
