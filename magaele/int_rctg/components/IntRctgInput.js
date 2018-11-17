import React, { Component } from 'react';

class IntRctgInput extends Component {
    render () {
        const {
            className,
            placeholder,
            handleKeyUp,
            handleBlur,
            handleChange,
            handleFocus,
            inputValue
        } = this.props;
        return (
            <input
                type="text"
                className={className}
                placeholder={placeholder}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={inputValue}
            />
        );
    }
}

export default IntRctgInput;