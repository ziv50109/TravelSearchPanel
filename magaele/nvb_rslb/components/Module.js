import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css.scss';

class Module extends Component {
    static defaultProps = {
        direction: 'left',
        width: '100%',
    };

    static propTypes = {
        className: PropTypes.string,
        direction: PropTypes.oneOf(['left', 'right']).isRequired,
        width: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        ContentComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node,
        ]),
    };

    render () {
        const {
            className,
            visible,
            width,
            direction,
            ContentComponent,
            children,
            zIndex,
            bgColor,
            noShadow
        } = this.props;

        let classes = cx('nvb_rslb', className, {
            active: visible,
            nvb_rslb_noShadow: noShadow
        });
        let divStyle = {
            width,
            zIndex,
            backgroundColor: bgColor
        };

        return ReactDOM.createPortal(
            <div
                className={classes}
                style={divStyle}
                direction={direction}
            >
                {
                    ContentComponent ? ContentComponent : children
                }
            </div>
            , document.body);
    }
}

export default Module;
