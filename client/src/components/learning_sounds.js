import React, {Component} from 'react'
import _ from 'lodash'
import { Navigate } from 'react-router-dom'
import Title from './Title'
import { getAllSounds } from './panWads'

export default class LearningSounds extends Component {
	constructor(props){
		super(props)
		this.sounds = getAllSounds()
		this.soundNames = _.shuffle(Object.keys(this.sounds))
		this.state = {
			currentOption: this.soundNames[0],
			currentSound: this.sounds[this.soundNames[0]],
			playing: false,
			finished: false,
			startTime: null,
		}

		this.options = this.soundNames.map(sound=>(
			<option key={sound} value={sound}>{sound}</option>
		))
		this.handleChange = this.handleChange.bind(this)
		this.playSound = this.playSound.bind(this)
		this.handleFinished = this.handleFinished.bind(this)
	}

	componentDidMount(){
		this.setState({startTime: new Date().getTime()})
	}

	handleFinished(){
		this.state.currentSound.stop()
		const done = window.confirm("Are you sure you would like to continue past the learning stage")
		if(done){
			const endTime = new Date().getTime()
			const startTime = this.state.startTime
			this.props.handleDataChange("learning_sounds", {startTime, endTime})
			this.setState({finished:true, startTime:null})
		}
	}

	handleChange(e){
		const newOption = e.target.value
		if(this.state.currentSound) this.state.currentSound.stop()
		const newSound = this.sounds[newOption]
		this.setState({currentSound: newSound, currentOption: newOption, playing:true})
		newSound.play().then(()=>this.setState({playing:false}))
	}


	playSound(){
		if(this.state.currentSound) this.state.currentSound.stop()
		this.state.currentSound.play()
			.then(()=>this.setState({playing:false}))
		this.setState({playing:true})
	}

	render(){
		return(
			<div>
			{this.state.finished ? <Navigate to={this.props.nextPage} /> : null}
			<Title title="Learning Sounds"></Title>
			<select onChange={this.handleChange}>
				{this.options}
			</select>
			<button onClick={()=>this.state.currentSound.stop()}>Stop Sound</button>
			<button onClick={this.playSound}>Play Sound</button>
			<button onClick={this.handleFinished}>Finish Learning the sounds</button>
			</div>
		)
	}
}