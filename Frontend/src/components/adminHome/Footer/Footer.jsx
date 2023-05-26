import React from 'react'
import "./Footer.css";
import {FaFacebookF,FaTwitter,FaInstagramSquare,FaHourglassEnd} from 'react-icons/fa'
import Typed from '../../../utils/Typed';
// import "./bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAppStoreIos, faFacebook, faGooglePlay, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
// import { ArrowRightCircleFill} from 'react-bootstrap-icons';

function Footer(){
    const arr=["Sign up for the Best Made newsletter to get the latest news, announcements, special offers and event information"]
    return(
        <div className='mt-5 '>
        <div >
            <div className="bottom-sidebar kopa-area  bg-gradient"  style = {{backgroundColor:"black", height : "-50%" }}>
            <div className="container">
			<div className="row" >
				<div className="col-md-6">
			  
		
						<div  style={{textAlign: "center", fontSize: "25px"}} >
							<p className='text-light'>About Us</p>
						</div>
						

						<div className=""  style = {{borderRight : "2px solid white", color : "white"}}>
							<p> Edurika online Services , India</p>
							<p>EMAIL : EdurikaOnline@gmail.com <br/>Phone : 111-222-33</p>
							
						</div>

			 </div>
			  
			  <div className="col-md-6">
					<article className="entry-item">
								<div className="entry-content">
									<h4 className="entry-title style-03 newsletter-title" style={{color:"#C3073F"}}>
										Newsletter Sign Up
									</h4>
									<p style = {{color :"white"}}>
										<Typed data={arr}></Typed>
                                        </p>
									<div className="enter-mail">
										<form method="post" action="#">
											<input className="mail-input" placeholder="Your email address" type="text"   id="mail"/>
											<button type="submit" className="mail-submit" style = {{color:"white", fontSize:"20px"}}><FaHourglassEnd />
											</button>										
										</form>
									</div>
								</div>
							</article>
			  </div>
			  
			</div>

				
					<div className="widget millside-module-mail" style = {{marginLeft: "60%", marginTop : "1%"}}>
							
							
						<div className="kopa-social-links-2 text-center" style = {{marginLeft :" -150%" }}>
						
							<ul className="clearfix">
								<li><a href="#" ><FaFacebookF></FaFacebookF></a></li>												
								<li><a href="#"><FaTwitter></FaTwitter></a></li>
								<li><a href="#"><FaInstagramSquare></FaInstagramSquare></a></li>
							</ul>
						</div>
					</div>


				</div>
					</div>
		
		</div>
	

			<footer className="p-3" style = {{backgroundColor:"black"}}>
			<div className="container">
				
				<p className="text-center"  >
				Copyright © 2021  www.edurika.com All Rights Reserved. 
				</p>
			</div>
		
		</footer>
        </div>
    );
}

export default Footer