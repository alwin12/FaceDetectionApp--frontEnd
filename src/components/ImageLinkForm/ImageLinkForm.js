import React from 'react'
import './ImageLinkForm.css'
//e50429999a3b497080b0f9c7b47791f2

const ImageLinkForm =({onInputChange,onButtonSubmit}) =>{


	return(


<div>

<p className ='fa4'>
{'copy the image link below and click Detect '}
</p>

<div className='center'>
<div className=' form center pa4 br3 shadow-5'>
<input type = 'text' className =' fa4 pa3 w-70 center' onChange ={onInputChange}/>
<button className ='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {onButtonSubmit}>Detect</button>
</div>
</div>


</div>
		)
}



export default ImageLinkForm