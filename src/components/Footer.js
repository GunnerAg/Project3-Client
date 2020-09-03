import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div>
                    <ul className="footercont">

                        <li className="footericons">
                        <a href="https://www.facebook.com/gunneremilio.andersengil/">
                        <img src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598959535/facebook_zzimsz.png' alt='Facebook'/>
                        </a>
                        </li>


                        <li className="footericons">
                        <a href="#">
                        <img src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598959534/twitter_di8al5.png' alt='Twitter'/>
                        </a>
                        </li>

                        <li className="footericons">
                        <a href="#">
                        <img src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598959534/instagram_ywgtxs.png' alt='Instagram'/>
                        </a>
                        </li>

                        <li className="footericons">
                        <a href="https://j0bber.herokuapp.com/">
                        <img src='https://res.cloudinary.com/dzzpwrdae/image/upload/v1598960091/jobber_zddlhh.png' alt='jo0ber'/>
                        </a>
                        </li>  

                    </ul>                            
                </div>
            </div>

        )
    }
}




