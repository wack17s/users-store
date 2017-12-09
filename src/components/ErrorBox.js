import React, { PureComponent } from 'react';

const errorMsg = 'Something went wrong :( Try to reload the page.';

const style = {
  height: '100%',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '38px',
  color: 'grey',
  fontFamily: 'Arial'
};

export default class App extends PureComponent {
  render() {
    return (
      <div style={style}>
        {errorMsg}
      </div>
    );
  }
}
