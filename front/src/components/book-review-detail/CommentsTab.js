export const CommentsTab = ({ comments = [] }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="pt-1">
            <p className="fw-bold fs-4">Comments </p>
          </div>
          <div style={{ overflowY: "scroll", height: "20vh" }}>
            {comments.map((val, index) => (
              <li key={index} className="pb-3 pt-2">{val.comments}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
