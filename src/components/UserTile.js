import React from 'react';

const UserTile = ({user}) =>
  <div className='user-tile' key={user.name}>
    <h4>{user.name}</h4>
  </div>


export default UserTile;
