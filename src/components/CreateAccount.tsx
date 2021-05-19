import React from 'react';
import { Dispatch } from 'redux';

import { connect } from 'react-redux';

import { State } from '../config/store';

/* eslint-disable @typescript-eslint/no-unused-vars */
const CreateAccount = (): JSX.Element => (
  <>
    <div />
  </>

);

interface CreateAccountProps {

}

const mapStateToProps = (state: State): CreateAccountProps => ({} as unknown) as CreateAccountProps;

const mapDispatchToProps = (): CreateAccountProps => ({} as unknown) as CreateAccountProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
