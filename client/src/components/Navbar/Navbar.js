import React from 'react'
import moment from 'moment'
const Navbar = () => {

    const getTimeandDate = () =>{
        return moment().format("ddd, MMM Do, h:mm a");
    }
    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container navbar-container">
       <div>
       <img src="https://img.icons8.com/fluent/48/000000/conference-call.png" height='30px' width='30px' style={{marginRight:'5px'}} className="d-inline-block align-top" alt=""/>
       <a class="navbar-brand" href="#">XYZ Meet</a>
       </div>
  
        
            <span class="navbar-text">
            {getTimeandDate()}
            </span>
        
        </div>
    </nav>
    )
}

export default Navbar
