import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IcRcln from '../../../ic_rcln';
import '../../css.scss';

class Label extends Component {
    static defaultProps = {
        label: '',
        iconName: '',
        isRequired: false,
        size: 'lg'
    };
    static propTypes = {
        label: PropTypes.string,
        iconName: PropTypes.string,
        isRequire: PropTypes.bool,
        // size: PropTypes.string
    };
    constructor (props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.prevTextLength = 0;
    }
    handleFocus () {
        if (this.props.onFocus) this.props.onFocus();
    }
    handleBlur () {
        if (this.props.onBlur) this.props.onBlur();
    }
    handleChange (e) {
        if (this.props.onChange) this.props.onChange(e);
    }
    handleClick (callback) {
        if (this.props.onClick) this.props.onClick();
        if (typeof callback === 'function') callback();
    }
    renderLabel () {
        return this.props.label ?
            (
                <div className="int-label require">
                    <label>{this.props.label}</label>
                </div>
            ) : '';
    }
    renderIcon () {
        return (
            this.props.iconName ?
                <div className="icon">
                    <IcRcln name={this.props.iconName} />
                </div>
                :
                null
        );
    }
    render () {
        const {
            isFocus,
            isMax,
            subComponent,
            isRequired,
            size
        } = this.props;
        const classes = cx('int_rctg', size, {
            require: isRequired,
            focus: isFocus,
            isMax: isMax,
        });
        return (
            <React.Fragment>
                <div
                    className={classes}
                    onBlur={this.handleBlur}
                    onClick={this.handleClick}
                    tabIndex={-1}
                >
                    {this.renderIcon()}
                    <div className="int-col">
                        {this.renderLabel()}
                        {subComponent}
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default Label;
