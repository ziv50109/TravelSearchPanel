import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css.scss';

class Module extends Component {
    state = {
        ifTurnOnClear: false // 清除按鈕，true代表打開，false代表關閉
    };

    handleChange = e => {
        if (this.props.onClearValue) {
            if (e.target.value !== '') {
                this.setState({ ifTurnOnClear: true });
            } else {
                this.setState({ ifTurnOnClear: false });
            }
        }
        if (this.props.onChange) {
            this.props.onChange(e, e.target.value);
        }
    };

    handleBlur = e => {
        if (this.props.onClearValue) {
            this.setState({ ifTurnOnClear: false });
        }
        if (this.props.onBlur) {
            this.props.onBlur(e, e.target.value);
        }
    };

    handleFocus = e => {
        if (this.props.onClearValue) {
            if (e.target.value !== '') {
                this.setState({ ifTurnOnClear: true });
            }
        }
        if (this.props.onFocus) {
            this.props.onFocus(e, e.target.value);
        }
    };

    handleClick = (e, input) => {
        if (this.props.onClick) {
            this.props.onClick(e, e.target.value, input);
        }
    };

    handleKeyPress = e => {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(e, e.target.value);
        }
    };

    handleKeyDown = e => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e, e.target.value);
        }
    };

    handleKeyUp = e => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e, e.target.value);
        }
    };

    handleCompositionStart = e => {
        if (this.props.onCompositionStart) {
            this.props.onCompositionStart(e, e.target.value);
        }
    };

    handleCompositionUpdate = e => {
        if (this.props.onCompositionUpdate) {
            this.props.onCompositionUpdate(e, e.target.value);
        }
    };

    handleCompositionEnd = e => {
        if (this.props.onCompositionEnd) {
            this.props.onCompositionEnd(e, e.target.value);
        }
    };

    handleClearValue = e => {
        if (this.props.onClearValue) {
            this.props.onClearValue(this.inputDOM);
        }
    };

    _renderLabel = () => {
        const { label: labelText } = this.props;

        return (
            <label
                className="int_rcln_label"
                onClick={() => {
                    this.inputDOM.focus();
                }}
            >
                {labelText}
            </label>
        );
    };

    _renderContent = () => {
        const { placeholder, disabled, readOnly, value } = this.props;

        if (readOnly && !disabled) {
            return (
                <span
                    className="int_rcln_input"
                    ref={e => {
                        this.inputDOM = e;
                    }}
                    data-placeholder={placeholder}
                    tabIndex={-1}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onClick={this.handleClick}
                >
                    {value}
                </span>
            );
        } else {
            return (
                <React.Fragment>
                    <input
                        className="int_rcln_input"
                        ref={e => {
                            this.inputDOM = e;
                        }}
                        type="text"
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        onClick={(e, input) => this.handleClick(e, this.inputDOM)}
                        onKeyDown={this.handleKeyDown}
                        onKeyUp={this.handleKeyUp}
                        onKeyPress={this.handleKeyPress}
                        onCompositionEnd={this.handleCompositionEnd}
                        onCompositionStart={this.handleCompositionStart}
                        onCompositionUpdate={this.handleCompositionUpdate}
                        value={value}
                        readOnly={readOnly}
                    />

                    {/* ifTurnOnClear 如果是 Turn 就會顯示出來 */}
                    {this.state.ifTurnOnClear && this.props.onClearValue ? (
                        <div
                            className="clearBtnWrap"
                            onClick={this.handleClearValue}
                            onMouseDown={this.handleClearValue}
                        >
                            <span className="clearBtn" />
                        </div>
                    ) : null}
                </React.Fragment>
            );
        }
    };

    render () {
        const {
            breakline,
            icon,
            label,
            noBorder,
            request,
            color,
            className,
            style
        } = this.props;

        const classes = cx('int_rcln', color, className, {
            breakline: breakline || (icon && label),
            icon: icon,
            noBorder: noBorder,
            request: request
        });

        return (
            <div className={classes} style={style}>
                {icon}

                {label && this._renderLabel()}

                {this._renderContent()}
            </div>
        );
    }
}

// Props default value write here
Module.defaultProps = {};

// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    className: PropTypes.string,
    breakline: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    icon: PropTypes.element,
    readOnly: PropTypes.bool,
    noBorder: PropTypes.bool,
    request: PropTypes.bool
};

export default Module;
