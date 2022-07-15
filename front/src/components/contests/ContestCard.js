import React from 'react';

export const ContestCard = ({src}) => {
	return (
		<div className="card hover-shadow bg-light text-black">
			<img 
				className="card-img-top" 
				src={src} 
				alt=""
			/>
		</div>
	);
};