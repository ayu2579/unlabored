import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { Grid, Tabs, Tab, Button } from 'react-bootstrap';
import store from '../store';
import { history } from '../contrib';
import { createAction, exploreAction } from '../actions';
import { NavigationBar } from '../components/contrib';
import { CountableInput, TextForm, ImageForm } from '../components/create';

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kind: 'text',
      title: '',
      tags: '',
    };

    this.valid = this.valid.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  valid() {
    const { selectedColor, leftItem, rightItem } = this.props.create;
    const { kind, title, tags } = this.state || {};

    if (_.isEqual(kind, 'text') && _.isEmpty(selectedColor)) {
      return '색상을 선택해 주세요';
    }

    if (_.isEmpty(title)) {
      return '제목을 입력해 주세요.';
    }

    if (_.isEmpty(tags)) {
      return '태그를 입력해 주세요.';
    }

    if (_.isEmpty(leftItem) || _.isEmpty(rightItem)) {
      return '아이탬을 입력해 주세요.';
    }

    // eslint-disable-next-line consistent-return
    return;
  }

  handleExit() {
    store.dispatch(createAction.hide());
    store.dispatch(exploreAction.fetch());
  }

  handleSubmit() {
    const { create } = this.props;
    const { selectedColor } = create;
    const { kind, tags } = this.state || {};
    const title = this.title.getValue();

    store.dispatch(createAction.saveTopic({
      kind, title, tags, color: selectedColor,
    })).then(() => {
      this.handleExit();
      history.push({ pathname: '/explore/latest' });
    });
  }

  handleChangeTags(e) {
    let tags = e.target.value;

    if (/\s(?!#)/g.test(e.target.value)) {
      tags = tags.replace(/\s(?!#)/g, ' #');
    } else if (/#$/.test(tags)) {
      tags = _.trimEnd(tags, ' #');
    }

    if (!/^#/.test(tags)) {
      tags = `#${tags}`;
    }

    this.setState({ tags });
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleSelect(kind) {
    this.setState({ kind });
  }

  render() {
    const { kind, title, tags } = this.state || {};
    const disabled = !_.isEmpty(this.valid());

    return (
      <div id="create" className="react-container">
        <NavigationBar
          title="궁금한거물어봐"
          onExit={this.handleExit}
        />

        <Grid>
          <CountableInput
            ref={c => (this.title = c)}
            type="text"
            value={title}
            onChange={this.handleChangeTitle}
            placeholder="제목적어"
          />

          <CountableInput
            ref={c => (this.tags = c)}
            type="text"
            max={40}
            value={tags}
            onChange={this.handleChangeTags}
            placeholder="#태그적어"
          />

          <Tabs
            id="create-tabs"
            animation={false}
            activeKey={kind}
            onSelect={this.handleSelect}
          >
            <Tab eventKey="text" title="적어보자">
              <TextForm />
            </Tab>
            <Tab eventKey="image" title="사진고르자">
              <ImageForm />
            </Tab>
          </Tabs>
        </Grid>

        <Button
          disabled={disabled}
          className="btn-submit"
          onClick={this.handleSubmit}
        >
          {disabled ? '다 써야 올라갈껄?' : '뭐가 좋은지 물어봐'}
        </Button>
      </div>
    );
  }
}

CreateContainer.propTypes = {
  create: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => _.pick(state, ['create']))(CreateContainer);
