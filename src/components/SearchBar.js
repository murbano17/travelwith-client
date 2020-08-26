//    poner onChange   y  value

import React from "react";

class SearchBar extends React.Component {
  state = {
    search: "",
  };

  handleChange = (e) => {
    const updatedText = e.target.value;
    this.setState({ search: updatedText });

    this.props.filterTravels(updatedText);
  };

  render() {
    return (
      <div className="searchbar">
        <input
          className="searchTerm"
          placeholder="What are you looking for?"
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

export default SearchBar;
