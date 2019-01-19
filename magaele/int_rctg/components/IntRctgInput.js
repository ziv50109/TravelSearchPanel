import React, { Component } from 'react';

class IntRctgInput extends Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();
    }
    render () {
        const {
            className,
            placeholder,
            handleKeyUp,
            handleBlur,
            handleChange,
            handleFocus,
            inputValue,
            handleClick,
            ...other
        } = this.props;
        return (
            <input
                type="text"
                ref={this.input}
                className={className}
                placeholder={placeholder}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClick(this.input)}
                value={inputValue}
                {...other}
            />
        );
    }
}

export default IntRctgInput;