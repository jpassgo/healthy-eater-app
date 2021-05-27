import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = makeStyles(() => ({
  gridContainer: {},
  root: {
    minWidth: 250,
    minHeight: 250,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginRight: 250,
  },
}));

function Title() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        marginRight: 50,
      }}
    >
      <h1>Healthy Eater</h1>
    </div>
  );
}

export default Title;
