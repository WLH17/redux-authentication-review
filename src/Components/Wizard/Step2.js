//View the Step1 component for an explanation of subscribing a component.
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateImg} from '../../redux/reducer';
import './Wiz.css';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({img: this.props.img});
  }

  handleChange(value) {
    this.setState({ img: value })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className='wiz_input_container'>
          <div className='wiz_input_box'>
            <p>Image URL</p>
            <input style={{ width: "35vw" }} value={this.state.img} onChange={e => this.handleChange(e.target.value)} />
          </div>
        </div>
        {/* button needs to do something */}
        <button 
          className='wiz_button wiz_prev_button'
          onClick={() => {
            this.props.updateImg(this.state.img);
            this.props.history.push('/wizard/step1');
          }}>Previous Step</button>
        {/* button needs to do something */}
        <button 
          className='wiz_button wiz_step_button'
          onClick={() => {
            this.props.updateImg(this.state.img);
            this.props.history.push('/wizard/step3');
          }}>Next Step</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  let {img} = reduxState;
  return {img}
};

export default connect(mapStateToProps, {updateImg})(Step2);