import React, { Component } from 'react';
import IntRctgInput from './IntRctgInput';

class IntRctgTag extends Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();
        this.label = React.createRef();
    }
    renderTag () {
        const { tagItems, removeItem } = this.props;
        let tags = [];
        if (this.props !== null) {
            tagItems.map((item, index) => {
                tags.push(
                    <label
                        ref={this.label}
                        className="int-tag"
                        title={item}
                        key={item}
                        onClick={() => removeItem(index)}
                    >
                        {item}
                        <span>x</span>
                    </label>
                );
                return tags;
            });
        }
        return tags;
    }
    render () {
        const {
            placeholder,
            handleKeyUp,
            handleChange,
            handleFocus,
            inputValue
        } = this.props;
        return (
            <div className="int-tags">
                {this.renderTag()}
                <IntRctgInput
                    ref={this.input}
                    placeholder={placeholder}
                    handleKeyUp={handleKeyUp}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    inputValue={inputValue}
                />
            </div>
        );
    }
}

export default IntRctgTag;