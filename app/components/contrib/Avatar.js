import React, { PropTypes } from 'react';
import { Image } from 'react-bootstrap';

const Avatar = ({ user }) => {
  const { username, image } = user;

  return (
    <div className="avatar">
      <Image src={image} />
      {username}
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Avatar;
