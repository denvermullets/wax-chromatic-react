import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// use query string to determine page url? maybe setup history to force update

class NavBar extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    
    const { activeItem } = this.state

    return (
      <>
        <Menu inverted>
        <Menu.Item
          name='browse'
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}
        >
          Browse
        </Menu.Item>

        <Menu.Item
          name='submit'
          active={activeItem === 'submit'}
          onClick={this.handleItemClick}
        >
          Submit
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            Login
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </>
    );
  }
}

export default NavBar;
