import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../css.scss';

class Module extends Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    onClick (e) {
        this.props.whenClick && this.props.whenClick();
    }
    onMouseDown (e) {
        this.props.whenMouseDown && this.props.whenMouseDown();
    }
    onChange (e) {
        this.props.whenChange && this.props.whenChange();
    }
    render () {
        let defaultClass = cx('cr_rcio', this.props.className, {});
        let customClass = cx('indicator',
            this.props.className
        );
        return (
            <label className={defaultClass}>
                <input type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    id={this.props.id}
                    onClick={this.onClick}
                    onMouseDown={this.onMouseDown}
                    onChange={this.onChange}
                    defaultChecked={this.props.defaultChecked}
                    disabled={!!this.props.disabled}
                />
                <span className={customClass}></span>
                <span>{this.props.textContent}</span>
            </label>
        );
    }
}
// Props default value write here
Module.defaultProps = {
    type: 'radio',
    defaultChecked: false,
    textContent: ''
};
// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    id: PropTypes.string || PropTypes.number,
    defaultChecked: PropTypes.bool,
    textContent: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func
};

export default Module;