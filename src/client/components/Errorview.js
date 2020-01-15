import React from 'react'

class Errorview extends React.Component {
  render() {
    const { error } = this.props;

    return (
      <div>
        <h1 className="animated">splash</h1>
        <h2>Error</h2>
        {error.message ? <pre>{error.message}</pre> : <p>Something went wrong, please try again</p>}
      </div>
    )
  }
}

export default Errorview;