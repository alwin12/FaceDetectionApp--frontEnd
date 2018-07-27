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
import {BrowserRouter as Router, Route, Redirect,withRouter,Link,Switch} from 'react-router-dom'
import ParticleConfig from "./ParticleConfig"


              

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
const authentication = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true
  },
  signOut(cb) {
    this.isAuthenticated = false;
    setTimeout(cb,100)

  }
}


const AuthButton = withRouter(({history})=> 

 authentication.isAuthenticated? (

    <div style= {{display:"flex",justifyContent: "flex-end"}}>
    <p className = 'f3 link dim black underline pa3 pointer' onClick = {()=>{authentication.signOut(()=>history.push("/signin"))}}>
 
 Sign Out

    </p>
    </div>

 ):(
  <div>please log in </div>   
 
 )

)



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

     logIn = () => {


      authentication.authenticate();
    }
  render() {
    return (


<Router>
<div className = "App">
       <Particles className='particles' params = {ParticleConfig}/>
    
    <Switch>
      
      
       <Route path = "/signin" render ={(props)=>{


        return (
       
        <SignIn onRouteChange ={this.onRouteChange} loadUser = {this.loadUser} AuthButton = {AuthButton} logIn = {this.logIn} authentication = {authentication}/>
        
        )
       }} />
       <Route exact path = "/" render = {()=> (<Redirect to = "/signin"/>)}/>
        <Route exact path ="/register" render = {(props)=>{


          return (

        <Register onRouteChange ={this.onRouteChange} loadUser = {this.loadUser} logIn = {this.logIn}/>

          )
        }}/>
       <Route path = "/home" render= { props => authentication.isAuthenticated
     
       ? (

      <div >
      <AuthButton/>
         <Logo/>
         
       <Rank name={this.state.user.name} entries={this.state.user.entries}/>
       <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
      
     <FaceRecognition box ={this.state.box} imageUrl ={this.state.imageUrl}/>
     
      </div>


       ): (
      <Redirect  to = {{pathname: "/signin", state: {from: props.location}}}/>

       )


       } /> 

      </Switch>
    </div>
      </Router>
    );

  }
}
 
 



export default App;







