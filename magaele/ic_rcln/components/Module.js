import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css.scss';

let Module = (props) => {
    const {
        className,
        name,
        size,
        link,
        circular,
        border,
        color,
        ...other
    } = props;

    const classes = cx(
        'ic_rcln',
        className,
        name,
        size,
        link ? 'link' : null,
        circular ? 'circular' : null,
        border ? 'border' : null,
        color
    );
    return (
        <i className={classes} {...other}></i>
    );
};

// Props default value write here
Module.defaultProps = {
    className: '',
    name: '',
    size: '',
    link: false,
    circular: false,
    border: false,
    color: ''
};

// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    link: PropTypes.bool.isRequired,
    circular: PropTypes.bool.isRequired,
    border: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired
};

export default Module;