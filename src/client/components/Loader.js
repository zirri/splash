import React from 'react'

class Loader extends React.Component {
    componentDidMount() {
        
        setTimeout(() => {
            const { history } = this.props;
          history.replace('/home')
          }, 2000);
    }

    render() {
    
        return (
            <div>
                <h1 className="animated">splash</h1>
                <p>Your water measuring app</p>
            </div>
        )
    }
}

export default Loader