import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			registerEmail: '',
			registerName:'',
			registerPassword:'',
		}
	}

	onNameChange = (event) => {
		this.setState({ registerName: event.target.value })
	}

	onEmailChange = (event) => {
		this.setState({ registerEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ registerPassword: event.target.value })
	}

	onSubmitRegister = () => {
		fetch('https://glacial-river-86381.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-type':'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			}),
		}) 
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');	
			} else {
				console.log('failed to add user')
			}
		})
	}

	render(){
			return(
			<article className="pa4 br3 shadow-5 bg-silver ba bw-2 b--light-silver mv4 w-100 w-50-m w-25-l mw6 center">
			  <div action="sign-up_submit" method="get" acceptCharset="utf-8">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
			        <input onChange={ this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
			        <input onChange={ this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange={ this.onPasswordChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="mt3">
			    <input
			    	onClick={this.onSubmitRegister} 
			    	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
			    	type="submit" 
			    	value="Register" />
			    </div>
			  </div>
			</article>
		);
	}


}

export default Register;