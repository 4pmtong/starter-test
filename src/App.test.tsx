import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  expect(
    shallow(<App />)
      .find('Connect(Layouts)')
      .dive()
  );
  ReactDOM.unmountComponentAtNode(div);
});
