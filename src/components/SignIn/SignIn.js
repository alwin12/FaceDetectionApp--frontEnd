import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom'


class SignIn  extends Component{


  constructor(props){
    super(props);
    this.state ={
      signInEmail: '',
      signInPassword: '',
      signedIn: false
    }
  }

  onChangeEmail =(event) => {

    this.setState({signInEmail:event.target.value}) 
     console.log(event.target.value)
  }
  onChangePassword = (event) => {

    this.setState({signInPassword:event.target.value })
    console.log(event.target.value)
  }
 onSubmitSignIn=()=> {
      console.log(this.state);
    fetch('https://secret-journey-86720.herokuapp.com/signin',{
           
 method: 'post',
 headers: {'Content-type':'application/json'},
 body: JSON.stringify({

  email: this.state.signInEmail,
  password: this.state.signInPassword
 })

     })
    .then(response => response.json()).then(user=>{
      console.log(user)
      if (user.id){

         this.props.loadUser(user)
        this.props.logIn();
     this.setState({signedIn:true})


       

     //this.props.onRouteChange('home');


      }
    }).catch(err => console.log('error'))


  

 }
render() {
  const {AuthButton,login,authentication} = this.props;
  

   

if (this.state.signedIn){

return <Redirect to = {{pathname: "/home"}}/>
}


return (
    
<main className="pa4 black-80 mt4">
<article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <form className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
        <input onChange={this.onChangeEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" for="password">Password</label>
        <input onChange={this.onChangePassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in"/>
     
    </div>
    <div className="lh-copy mt3">
     <Link to = "/register"><p onClick= {()=>this.props.onRouteChange('register') } href="#0" className="f6 link dim black db">Register</p></Link>
      
    </div>
  </form>
  </article>
</main>


    );

  
}


	
}

export default SignIn