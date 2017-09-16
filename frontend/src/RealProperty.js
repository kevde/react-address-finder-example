import React, { Component } from 'react';

class RealProperty extends Component {

  getBackgroundStyle(street,city, state) {
    return {
      backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=${street},${city},${state}&zoom=8&size=700x700&key=AIzaSyDRQtqI-_-nAcVISZ6__EgfhMKMT3FoQeA')`
    };
  }

  render() {
    return (
      <div className="RealProperty" key={this.props.item.id}>
        <div className="block">
        <div className="location" style={this.getBackgroundStyle(this.props.item.street, this.props.item.city, this.props.item.state)}>
         <div className="street">{this.props.item.street}</div>
         <div className="state">{this.props.item.state}</div>
         <div className="city">{this.props.item.city}</div>
         <div className="zip">{this.props.item.zip}</div>
         <div className="id">ID: {this.props.item.id}</div>
        </div>
        <div className="rent">{this.props.item.rent}<br/><span className="currency">USD</span></div>
        </div>
      </div>
    );
  }
}

export default RealProperty;