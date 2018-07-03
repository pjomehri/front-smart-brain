import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import Skull from './Logo.png'


const Logo = () => {
	return(
		<div className='ma3 mt0'>
			<Tilt className="Tilt br2 shadow-3" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner pa3"> 
			 	<img style={{paddingTop: '5px'}} src={Skull} alt='Logo' />
			 </div>
			</Tilt>
		</div>
		);
}

export default Logo;