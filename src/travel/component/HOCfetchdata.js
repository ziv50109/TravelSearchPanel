import React, { Component } from 'react';

const HOC = (WrappedComponent, WaitComponent) => {
    return class extends Component {
        render () {
            console.log(this.props);
            if (!this.props.data.length) {
                return WaitComponent ? <WaitComponent /> : <div>HOC...</div>;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
};
export default HOC;