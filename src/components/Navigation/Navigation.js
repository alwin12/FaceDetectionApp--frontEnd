import React from 'react'


const Navigation =({isSignedIn,onRouteChange}) => {

if (isSignedIn===true){
	return (

 <nav style ={{display: 'flex' ,justifyContent: 'flex-end'}}>
 <p onClick = {()=>onRouteChange('signOut')} className = 'f3 link dim black underline pa3 pointer'>{'Sign Out'}</p>
 </nav>
		)

}

else if(isSignedIn ===false){

 return(
 	

 <nav style ={{display: 'flex' ,justifyContent: 'flex-end'}}>
 <p onClick = {()=>onRouteChange('signIn')} className = 'f3 link dim black underline pa3 pointer'>{'Sign in'}</p>
 <p onClick = {()=>onRouteChange('register')} className = 'f3 link dim black underline pa3 pointer'>{'Register'}</p>
 </nav>


 	)


}
else {return (<div></div>)}
}

export default Navigation;