import React, { Component } from 'react';

class NavError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display the navigation</h2>
            );
        }
        return this.props.children;
    }
}

export default NavError;