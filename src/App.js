import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn'
import './App.css';
import Clarifai from 'clarifai'


const particleOptions = 
{
                particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
              }
              

    let initialState = {

    input: '',
    imageUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn:false,
    user: {
      id:'',
name:'',
email: '',
password:'',
entries: 0,
joined: ''
    }

     }


class App extends Component {

   constructor() {
    super();
     this.state = initialState;

     

    }

    loadUser = (data) => {
  
   this.setState({

     user: {
     
id:data.id,
name:data.name,
email: data.email,
password:data.password,
entries: data.entries,
joined: data.joined


     }

   })

 console.log(this.state.user);
    }

    componentDidMount() {

    }

     onInputChange =(event) => {

      this.setState({input:event.target.value})

    }

    onButtonSubmit=(event) => {
           this.setState({imageUrl:this.state.input});
      
     fetch('http://localhost:3000/imageUrl',{

   method: 'post',
   headers: {'Content-type': 'application/json'},
   body: JSON.stringify({

    input: this.state.input
   })

     })
     .then(response => response.json())

      .then(response => 
{
     if(response.outputs){

  fetch('http://localhost:3000/image',{

   method:'put',
   headers:{'Content-type':'application/json'},
   body: JSON.stringify({

    id: this.state.user.id
   })

  }).then(response=>response.json())
     .then(count=> {
        console.log('count:',count)

   this.setState(Object.assign(this.state.user,{entries:count}))
  })
        this.displayFaceBox(this.calculateFaceLocation(response))
    }


    })
      .catch(err=> console.log('error'))

    }


    calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputImage')
         const width = Number(image.width)
         const height = Number(image.height)

         return{

          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width- (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
         }

    }


    displayFaceBox =(box) => {
  
   this.setState({box:box})

    }

    onRouteChange= (mode)=> {
      if (mode ==='signOut'){
        this.setState(initialState)
        mode = 'signIn'
      }
      else if (mode=== 'home'){
        this.setState({isSignedIn:true})
      }
      

   this.setState({route:mode})


    }
  render() {


   

   
    return (

      <div className="App">
       
       <Particles className='particles' params = {particleOptions}/>
        
       <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
       {this.state.route === 'home'?

       <div>
       <Logo/>
       <Rank name={this.state.user.name} entries={this.state.user.entries}/>
       <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
      
     <FaceRecognition box ={this.state.box} imageUrl ={this.state.imageUrl}/>
   </div>

   :(
    this.state.route === 'signIn' ? 
    <SignIn onRouteChange ={this.onRouteChange} loadUser = {this.loadUser}/>
  : <Register onRouteChange ={this.onRouteChange} loadUser = {this.loadUser}/>

   )
       
       
       
 }
      </div>
    );
  }
}

export default App;
