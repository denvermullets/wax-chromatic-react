import React from "react"
import { List } from "semantic-ui-react"

const MemberItemActive = (props) => {
  return (
    <>
      <List.Item>
        {/* <Image avatar src='/images/avatar/small/daniel.jpg' /> */}
        <List.Content>
          <List.Header as="a">{props.member.name}</List.Header>
        </List.Content>
      </List.Item>
    </>
  )
}

export default MemberItemActive
