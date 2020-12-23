import React, { Component } from "react"
import WantlistList from "../components/WantlistList"
import { Container, Header } from "semantic-ui-react"

class Wantlist extends Component {
  render() {
    return (
      <>
        <Container>
          <Header as={"h1"}>My Wantlist</Header>
          <WantlistList vinyls={this.props.wantlist} />
        </Container>
      </>
    )
  }
}

export default Wantlist
