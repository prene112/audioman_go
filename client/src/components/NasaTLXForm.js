import React, { Component } from 'react';
import Slider from 'bootstrap-slider';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Question from './Question';
import categories from '../constants/NasaTLX';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Title from './Title';


class NasaTLXForm extends Component {
    constructor(props){
		super(props);
        this.state = {
            mental: null,
            physical: null,
            temporal: null,
            performance: null,
            effort: null,
            frustration: null,
            initialValue: 50,
            categories: ["mental", "physical", "temporal", "performance", "effort", "frustration"],
            currIndex: 0,
            currCat: null
        }
	}

    handleClick = (e) => {

        var result = {};
        for (var j = 0; j < categories.length; j++) {
            result[categories[j]["attribute"]] = $("#" + categories[j]["attribute"]).children()[1].value;
        }

        this.props.handleDataChange(`nasaTLX${this.props.trialNum}`, result)

            axios
                .post("http://localhost:5000/update/" + this.props.idProp, result)
                .then((res) => console.log(res.data));
    }

    render() {
        return (
            <div>
            <Title title="Nasa TLX Form"></Title>
            <form class="center" style={{marginLeft: "40%"}}>
                {categories.map((item, index) => (
                    <div>
                        <div>
                            <label htmlFor={item["attribute"]}>{item["label"]}</label>
                        </div>
                        <div id={item["attribute"]}>
                            <ReactBootstrapSlider
                                id={item["attribute"]}
                                value={this.state.initialValue}
                                change={this.changeValue}
                                slideStop={this.changeValue}
                                step={1}
                                max={100}
                                min={0}
                                orientation="horizontal"
                                reversed={false}
                                ticks={[0, 25, 50, 75, 100]}
                                ticks_positions={[0, 25, 50, 75, 100]}
                                ticks_labels={['0', '25', '50', '75', '100']}
                                ticks_snap_bounds={0}
                            />
                        </div>
                        <br></br>
                    </div>
                ))}
                <div className="container" style={{marginLeft: "30%"}}>
                    {(this.props.nextPage) &&
                        <NavLink exact activeClassName="active" to={this.props.nextPage} onClick={this.handleClick  }>
                            <FontAwesomeIcon icon={faLongArrowAltRight} size="4x"/>
                            Continue
                        </NavLink>
                    }
                </div>
            </form>
            </div>
        )
    }
}

export default NasaTLXForm;