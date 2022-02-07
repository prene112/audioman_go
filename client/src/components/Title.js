import React, { Component } from 'react';

import '../App.css';


class Title extends Component {
    constructor(props){
		super(props);
        this.state = {
            title: this.props.title
        }
	}

    render() {
        return (
            <div className='titleDiv'>
                <h1 style={{marginLeft: "15px"}}>{this.state.title}</h1>
                
            </div>
        )
    }
}

export default Title;