import React from 'react';
import './ContestCard.css'

export const ContestCard = ({src}) => {
  
  const download = () => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        src
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "ContestImage.jpg";
    element.click();
  };

	return (
		<div className="card hover-shadow bg-light text-black">
      <a 
        className="download-link" 
        title="Contest Image" 
        onClick={() => download()}
      >
        <img 
          className="card-img-top" 
          src={src} 
          alt="Contest Image"
        />
        <div class="card-footer download-btn">
            <i class="fa fa-download"></i> 
            Download Image
        </div>
      </a>
		</div>
	);
};