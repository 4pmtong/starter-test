import logo from '@/assets/logo.svg';
import * as React from 'react';

class SidebarLogo extends React.PureComponent {
  public render() {
    return (
      <div className="sidebar-logo">
        <a className="sidebar-link" href="/">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Tidal</h1>
        </a>
      </div>
    );
  }
}

export default SidebarLogo;
