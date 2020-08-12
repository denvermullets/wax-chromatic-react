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
          as={Link} to="/"
          name='home'
          active={activeItem === ''}
          onClick={this.handleItemClick}
        >
          Wax Chromatics
        </Menu.Item>
        <Menu.Item
          as={Link} to="/collection"
          name='collection'
          active={activeItem === 'collection'}
          onClick={this.handleItemClick}
        >
          Collection
        </Menu.Item>

        <Menu.Item
          as={Link} to="/wantlist"
          name='wantlist'
          active={activeItem === 'wantlist'}
          onClick={this.handleItemClick}
        >
          Wantlist
        </Menu.Item>

        <Menu.Menu position='right'>
          {this.props.username ? 
            <Menu.Item
            as={Link} to="/profile"
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          >
              {this.props.username}
            </Menu.Item>
              :
            
            <Menu.Item
              as={Link} to="/login"
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              Login
            </Menu.Item>
          }
          {
            this.props.loggedIn ? 
            <Menu.Item 
              as={Link} to="/logout"
              name='logout'
              active={activeItem === ''}
              onClick={this.handleItemClick}
            >
              Logout
            </Menu.Item>
            :
            null
          }
        </Menu.Menu>
      </Menu>
      </>
    );
  }
}

export default NavBar;
