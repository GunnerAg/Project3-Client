import React, { Component } from 'react';
import './Main.css'


export default class SearchBar extends Component {

    state = {
        searchTerm:''
     }

    onChange=(e)=>{
       this.setState({
        searchTerm: e.target.value
       }, () => {
        this.props.onSearch(this.state.searchTerm, this.props.from) 
       })
    }

    render() {
        return (
            <div className='searchbar'>
                <input 
                    type="text" 
                    onChange={this.onChange} 
                    placeholder='Search by keywords or usernames' 
                    value={this.state.searchTerm}
                    className='searchbar-input'
                    >
                </input>
            </div>
        )
    }
}
