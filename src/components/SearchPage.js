// maybe uninstall lodash
import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'


const SearchPage = () => {

  

  return (
    <>
    <Input 
          action={{
            icon: "search",
            onClick: () => this.handleClick()
          }}
          // onKeyPress={this.onKeyPress}
          // icon='search'
          placeholder='Search...' 
          // onChange={this.handleSearchChange}
        />
    </>
  );
}

export default SearchPage;
