import React from 'react'
import {Link,Redirect} from 'react-router-dom'



class Register extends React.Component{

  constructor(props){
    super(props);
      this.state= {

       name:"",
       email:"",
       password:"",
       isRegistered:false 

      }
  }
  onNameChange =(event) => {
 this.setState({name:event.target.value})
  }
  onEmailChange =(event) => {

    this.setState({email:event.target.value})
  }
  onPasswordChange = (event) => {

    this.setState({
    password: event.target.value
    })
  }

 onSubmitRegister=()=> {

      fetch('https://secret-journey-86720.herokuapp.com/register',{

    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({

      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })

      }).then(response => response.json()).then(user => {
     console.log(user);
     if(user.id){
      this.props.loadUser(user);
      this.props.logIn();
       this.setState({isRegistered:true})
    
     }


      })

      
    }
  
  render() {

   if(this.state.isRegistered){
    return <Redirect to= {{pathname:'/home'}}/>

     
   }

	return (
		
<main className="pa4 black-80">
<article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <form className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
       <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
      </div>
      <div className ="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    
    </fieldset>
    <div className="">
      <input onClick = {this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register"/>
    </div>
    <div className="lh-copy mt3">
     <Link to = "/signin"> <p href="#0" className="f6 link dim black db">Sign in</p></Link>
      
    </div>
  </form>
  </article>
</main>


		)

}

}

export default Register