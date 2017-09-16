import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import RealProperty from './RealProperty';
import UIAutocomplete from 'react-ui-autocomplete';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { realProperties: [], searchedText: '' };
  }

  async componentWillMount() {
    const realProperties = await this.queryProperties();
    this.setState(_.set(this.state, 'realProperties', realProperties));
  }

  async queryProperties() {
    const httpResult = await axios.get("http://localhost:3000/graphql?query={getProperties{id,street,city,zip,state,rent}}");
    return _.get(httpResult, 'data.data.getProperties', []);
  }

  get possibleValues() {
    return _.chain(this.state.realProperties).map(_.values).flatten().compact().uniq().sort().map(_.toString).value();
  }

  async onAutoCompleteChange(newValue) {
    const realProperties = await this.queryProperties();
    this.setState(_.set(this.state, 'realProperties', realProperties));
    this.setState(_.set(this.state, 'searchedText', newValue));
    this.render();
  }

  get displayedProperties() {
    return this.state.realProperties.filter((r) => this.isTextIncluded(r));
  }

  isTextIncluded(object) {
    return _.isEmpty(this.state.searchedText) || _.chain(object).values().some((text) => _.includes(_.toString(text).toLowerCase(), this.state.searchedText.toLowerCase())).value();
  }

  get renderedNoResults() {
    if (this.displayedProperties.length <= 0) {
      return (<div className="noresults">
                <div className="container">
                    No Properties were found in keyword <b>{this.state.searchedText}</b>
                </div>
            </div>)
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Address Finder</h2>
          <UIAutocomplete
              options={this.possibleValues}
              suggestionMinimumInputChar={1}
              value={this.state.searchedText}
              onChange={this.onAutoCompleteChange.bind(this)}
              allowNew={true}
              newValueRequiresEnter={false}
          />
        </div>
        <div className="RealProperty-box">
          <div className="RealProperty-list"> 
            {this.renderedNoResults} 
            {this.displayedProperties.map((realProperty, i) => (<RealProperty key={i} item={realProperty}></RealProperty>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;