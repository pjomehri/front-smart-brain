import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return(
		<div>
			<p className='f4 white dim'>{'This is Legendary, give it a try!'}</p>
			<div className="center">
				<div className="center pa4 br3 shadow-4 background">
					<input type='text' 
					 className='f5 pa2 w-70 center' 
					 onChange={onInputChange}
					/>
					<button 
					 className='w-30 grow f5 ph3 pv2 dib link white bg-blue' 
					 onClick={onSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm;