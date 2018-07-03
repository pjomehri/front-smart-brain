import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return(
		<div className='center ma'>
			<div className='absolute mt3'>
				<img 
				width='500px' 
				height='auto' 
				className='br3 shadow-3 ba b--mid-gray' 
				id='inputImage'
				src={imageUrl} 
				alt=''
				/>
				<div 
				className='bounding-box' 
				style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
				></div>
			</div>
		</div>
		);
}

export default FaceRecognition;

//