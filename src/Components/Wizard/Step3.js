//View the Step1 component for an explanation of subscribing a component.
import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateMoney, clear} from '../../redux/reducer';
import './Wiz.css';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mortgage: 0,
      recommended: 0,
      rent: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.complete = this.complete.bind(this);
  }

  componentDidMount() {
    this.setState({
      mortgage: this.props.mortgage,
      rent: this.props.rent
    })
  }

  handleChange(prop, value) {
    switch (prop) {
      case 'mortgage':
        this.setState({
          mortgage: value, recommended: value * 1.25
        })
        break;
      case 'rent':
        this.setState({
          rent: value
        })
        break;
      default:
        break;
    }
  }

  complete = () => {
    let {name, address, city, state, zip, img} = this.props;
    let {mortgage, rent} = this.state;

    axios.post('/api/listing', {name, address, city, state, zip, img, mortgage, rent})
    .then(() => {
      this.props.clear();
      this.props.history.push('/dash')
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className='wiz_input_container'>
          <div style={{ textAlign: 'center', fontWeight: '700', margin: '20px' }}>Recommended Rent: ${this.state.recommended}</div>
          <div className='wiz_input_box'>
            <p>Monthly Mortgage Amount</p>
            <input type='number' style={{ width: "35vw" }} value={this.state.mortgage} onChange={e => this.handleChange('mortgage', e.target.value)} />
          </div>
          <div className='wiz_input_box'>
            <p>Desired Monthly Rent</p>
            <input type='number' style={{ width: "35vw" }} value={this.state.rent} onChange={e => this.handleChange('rent', e.target.value)} />
          </div>
        </div>
        {/* buttons need to do something */}
        <button 
          className='wiz_button wiz_prev_button'
          onClick={() => {
            this.props.updateMoney({mortgage: this.state.mortgage, rent: this.state.rent});
            this.props.history.push('/wizard/step2');
          }}>Previous Step</button>
        <button 
          className='wiz_button wiz_complete_button'
          onClick={this.complete}>Complete</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {updateMoney, clear})(Step3);