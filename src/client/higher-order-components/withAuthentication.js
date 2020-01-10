import React from 'react';
import Authentication from '../wrappers/Authenication.js';

function withAuthentication(Component) {
    return class extends React.Component {
      render() {
        return (
          <Authentication {...this.props}>
            <Component {...this.props} />
          </Authentication>
        );
      }
    }
  }

export default withAuthentication;