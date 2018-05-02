import React from 'react';


class Header extends React.Component {
              render() {
                return (
                  <nav className="navbar navbar-success">
                    <div className="container">
                      <h4>{this.props.headerName}</h4>
                    </div>
                  </nav>
                );
              }
          }

export default Header
