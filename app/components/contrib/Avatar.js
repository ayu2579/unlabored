import React, { PropTypes } from 'react';

const Avatar = ({ user, imageOnly }) => {
  const { picture, nickname } = user || {};

  return (
    <div className="avatar">
      <div
        className="picture"
        style={{
          backgroundImage: `url('${picture}')`,
        }}
      />
      {!imageOnly && nickname}
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }),
  imageOnly: PropTypes.bool,
};

export default Avatar;
