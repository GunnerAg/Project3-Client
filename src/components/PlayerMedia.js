import React, { Component } from 'react';
import ReactPlayer from "react-player";
import Loading from './Loading'
import './Loading.css'


export default class PlayerMedia extends Component {
    render() {

        if (!this.props.fileUrl) {
            return <Loading/>
          } 

        return (
            <div className='video-container'>
                <ReactPlayer controls={true} url={this.props.fileUrl}/>
            </div> 
        )
    }
}
