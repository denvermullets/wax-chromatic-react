import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import MemberItemActive from '../components/MemberItemActive';
import MemberItemInactive from '../components/MemberItemInactive';

// const waxUrl = 'http://localhost:3000/api/v1'
const waxUrl = 'https://api.waxchromatics.com/api/v1'

const Members = (props) => {
  const artistId = props.artistId
  const [ activeMembers, setActiveMembers ] = useState()
  const [ inActiveMembers, setInActiveMembers ] = useState()

  useEffect(() => {
    // look up artist members by waxDb artist id - returns array with object showing active state
    // then filter and split information based on current active status
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    if (artistId) {
      fetch(`${waxUrl}/members/active/${artistId}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${waxUser.token}`}})
          .then(response => response.json())
          .then(allMembers => {
            const currentMembers = allMembers
              .filter(member => member.member_artists
                .some(isActive => isActive.active_member === true))
            // single artists don't have 'members'
            if (currentMembers.length > 0){
              setActiveMembers(currentMembers)
            }

            const oldMembers = allMembers
              .filter(member => member.member_artists
                .some(isActive => isActive.active_member === false))
                // console.log(oldMembers)
            // bands can have no old members, just don't set an array in state to avoid showing up
            if (oldMembers.length > 0){
              setInActiveMembers(oldMembers)
            }
        })
    }
  }, [artistId]);

  return (
    <>
      {activeMembers ? 
        <span>Current: </span>  
        : null}
      <List horizontal>
        {activeMembers ? 
          activeMembers.map(member => <MemberItemActive member={member} key={member.id} />)
          : null}
      </List><br />
      {inActiveMembers ? 
        <span>Previous: </span>  
        : null}
      <List horizontal>
        {inActiveMembers ? 
          inActiveMembers.map(member => <MemberItemInactive member={member} key={member.id} />)
          : null}
      </List>
    </>
  );
}

export default Members;
