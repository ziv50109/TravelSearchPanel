import React from 'react';
import PropTypes from 'prop-types';
import './LbxRcln.scss';

const LbxRcln = (props) => {
    const getHighestZIndex = () => {
        let highestZIndex = 0;
        let currentZIndex = 0;
        let nodes = document.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
            currentZIndex = Number(window.getComputedStyle(nodes[i]).zIndex);
            if (currentZIndex > highestZIndex) highestZIndex = currentZIndex;
        }
        return highestZIndex + 1;
    };
    const handleClose = () => {
        props.closeLbxRcln && props.closeLbxRcln();
    };
    const contentClick = (e) => {
        e.stopPropagation();
        props.childrenClick && props.childrenClick();
    };
    return (
        <>
            {(props.children && props.open) &&
                <div className={`LbxRcln ${props.className}`}
                    style={{ zIndex: getHighestZIndex() }}
                    onClick={handleClose}>
                    <div className="LbxRcln_content"
                        onClick={contentClick}>
                        <span className="LbxRcln_close-btn"
                            onClick={handleClose}>
                            <svg viewBox="0 0 10 10">
                                <path d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" />
                            </svg>
                        </span>
                        {props.children}
                    </div>
                </div>
            }
        </>
    );
};
LbxRcln.defaultProps = {
    open: false
};
LbxRcln.propTypes = {
    open: PropTypes.bool,
    childrenClick: PropTypes.func,
    closeLbxRcln: PropTypes.func
};

export default LbxRcln;