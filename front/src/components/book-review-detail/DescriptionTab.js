export const DescriptionTab = ({ title, description }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="pt-1">
            <p className="fw-bold fs-2">{title} </p>
          </div>
          <div className="pb-3 pt-2">
            {description}
          </div>
        </div>
      </div>
    </>
  );
};
