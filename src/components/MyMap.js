import React, { Component } from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import L from 'leaflet'



export default class MyMap extends Component {
    state={
        starterPosition: [18.516726, 73.856255],
        icon : new L.Icon({
            iconUrl: 'https://res.cloudinary.com/dzzpwrdae/image/upload/v1599140056/pointer_nzs6hw.png',
            iconRetinaUrl: 'https://res.cloudinary.com/dzzpwrdae/image/upload/v1599140056/pointer_nzs6hw.png',
            iconAnchor: [20, 40],
            popupAnchor: [0, -35],
            iconSize: [40, 40],
            shadowSize: [29, 40],
            shadowAnchor: [7, 40],
          })
        }
    
    render() {

        return (         
            <div>
                  <div className='event-map'>
                    <Map center={this.state.starterPosition} zoom={13} style={{width:'500px', height:'300px'}}>
                        <TileLayer
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {this.props.events.filter((event)=> event.location).map((event)=>{
                            let splitedCordinates=event.location.split(',').map((cord)=>{
                                return parseFloat(cord)
                            })
                            return<Marker position={splitedCordinates} icon={this.state.icon}>
                            <Popup>{event.title}</Popup>
                            </Marker>
                            })}  
                    </Map>
                    </div>
            </div>
        )
    }
}

