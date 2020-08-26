
//    poner onChange   y  value

import React from 'react';

class SearchBar extends React.Component {
  state = {
    search: ""
  }

  handleChange = (e) => {
    const updatedText = e.target.value;
    this.setState({ search: updatedText })

    this.props.filterTravels(updatedText)
  }

  render() {
    return(
      <input className="searchbar" type="text" name="search" value={this.state.search} onChange={this.handleChange} />
    )
  }
}

export default SearchBar;