import React, { Component } from 'react';
import './App.css';
// import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


// const app = new Clarifai.App({
//  apiKey: 'e5e8146bde984e5f8b66beb2c88da47f'
// });

const particleOptions = 
      { particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 800
            }
          }
        }
      }
const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log);
  // }

  calculateFaceLocation = (response) => {
    const clarifaiFaces = response.outputs[0].data.regions;
    // const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
  //   return {
  //     leftCol: clarifaiFace.left_col*width,
  //     topRow: clarifaiFace.top_row*height,
  //     rightCol: width - (clarifaiFace.right_col*width),
  //     bottomRow: height - (clarifaiFace.bottom_row*height),
  //   }
  // }
    const results = clarifaiFaces.map((face,index) => {
      const clarifaiFace = face.region_info.bounding_box;
      //console.log(`face ${index} coordinates is:`, clarifaiFace);
         return {
          leftCol: clarifaiFace.left_col*width,
          topRow: clarifaiFace.top_row*height,
          rightCol: width - (clarifaiFace.right_col*width),
          bottomRow: height - (clarifaiFace.bottom_row*height),
        }
    })

    return results;
  }

  displayFaceBox = (boxes) => {
    boxes.forEach(box => this.setState({box: box}));
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      fetch('https://glacial-river-86381.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          //http://localhost:3000/
          fetch('https://glacial-river-86381.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)  
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true})
    } else if (route === 'signin' || route === 'register') {
      this.setState(initialState)
    }
    this.setState({ route: route})
  }

  renderSwitch = (route) => {
    const { name, entries } = this.state.user;
    switch(route){
            case 'signin':
              return <SignIn 
                      onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}
                      />
            case 'home': 
              return ( 
                <div>
                  <Logo />
                  <Rank 
                  name={ name }
                  entries={ entries }
                  />
                  <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onSubmit ={this.onSubmit}
                  />
                  <FaceRecognition 
                    imageUrl={this.state.imageUrl} 
                    box={this.state.box}
                  />  
                </div> );
              case 'register':
                return <Register 
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                  />
              default:
                return <SignIn 
                      onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}
                      />
          }
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles 
            className='particles'
            params={particleOptions}
        />
        <Navigation 
            onRouteChange={this.onRouteChange} 
            isSignedIn={ isSignedIn }
        />
        {
          this.renderSwitch(route)
        }
      </div>
    );
  }
}

export default App;
