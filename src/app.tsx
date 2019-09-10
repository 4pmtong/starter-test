import React from 'react';

// import Button from './components/Button';
import { Button } from 'antd';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        container,
        <Button type="primary">Button</Button>
      </div>
    );
  }
}
