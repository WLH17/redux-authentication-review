//The process of setting up a connection to redux from a component is known as 'subscribing'. A component can subscribe to state values on reduxState, or a component can subscribe to action creators, or in some cases both state and actions. To subscribe a component, you need to use the 'connect' method from react-redux. If you are going to subscribe to an action on redux, import the action(s) as well. View the bottom of this component to see how this works.
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateLocation} from '../../redux/reducer';
import './Wiz.css';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let { name, address, city, state, zip } = this.props
    this.setState({ name, address, city, state, zip })
  }

  handleChange(prop, value) {
    switch (prop) {
      case 'state':
        if (value.length > 2) {
          return
        }
        break;
      case 'zip':
        if (value.length > 5) {
          return
        }
        break;
      default:
        break;
    }
    this.setState({ [prop]: value })
  }

  render() {
    return (
      <div>
        <div className='wiz_input_container'>
          <div className='wiz_input_box'>
            <p>Property Name</p>
            <input value={this.state.name} onChange={e => this.handleChange('name', e.target.value)} />
          </div>
          <div className='wiz_input_box'>
            <p>Address</p>
            <input style={{ width: "35vw" }} value={this.state.address} onChange={e => this.handleChange('address', e.target.value)} />
          </div>
          <div className='wiz_input_box'>
            <p>City</p>
            <input value={this.state.city} onChange={e => this.handleChange('city', e.target.value)} />
          </div>
          <div className='wiz_input_box'>
            <p>State</p>
            <input style={{ width: "70px" }} value={this.state.state} onChange={e => this.handleChange('state', e.target.value)} />
          </div>
          <div className='wiz_input_box'>
            <p>Zip</p>
            <input style={{ width: "100px" }} type='number' value={this.state.zip} onChange={e => this.handleChange('zip', e.target.value)} />
          </div>
        </div>
        {/* button needs to do something */}
        <button 
          className='wiz_button wiz_step_button' 
          onClick={() => {
            this.props.updateLocation(this.state);
            this.props.history.push('/wizard/step2');
          }}>Next Step</button>
      </div>
    );
  }
}

//mapStateToProps is how we determine which state values we want our component to have access to. The commented example below will make the entirety of reduxState available to this component. The uncommented version of mapStateToProps will make the 'name, address, city, state, and zip' values from reduxState available to this component.

//const mapStateToProps = reduxState => reduxState;

const mapStateToProps = reduxState => {
  let {name, address, city, state, zip} = reduxState;
  return {name, address, city, state, zip}
}

//connect will subscribe your component to the redux information you specify. You need to pass in mapStateToProps when subscribing to state values from redux, and you must pass in an object, containing the actions your subscribing to, as the second argument. If your component needs to subscribe to actions but not state values, pass 'null' as the first argument.
export default connect(mapStateToProps, {updateLocation})(Step1);