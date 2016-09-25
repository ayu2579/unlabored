import _ from 'lodash';

import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const UserInfo = ({ user }) => {
  const { username, picture, countOfTopic, countOfSelection } = user;

  return (
    <div id="user-info">
      <Grid>
        <Dropzone
          style={{
            backgroundImage: `url("${picture}")`,
          }}
          className="picture"
        />
        <div className="summary">
          <ul>
            <li>{countOfTopic}개 물어봤어</li>
            <li>{countOfSelection}개 선택했어</li>
          </ul>
          {!_.isEmpty(username) && <address>{`goongmool.com/@${username}`}</address>}
          {_.isEmpty(username) && <span className="emptystate">설정에서 유저네임 설정해</span>}
        </div>
      </Grid>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
    username: PropTypes.string,
    countOfTopic: PropTypes.number,
    countOfSelection: PropTypes.number,
  }).isRequired,
};

export default UserInfo;
