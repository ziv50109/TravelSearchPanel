import React from 'react';
import '../css.scss';

const MobileHead = ({ title, onClick }) => {
    return (
        <div className="search_panel-mobileHead">
            <div className="search_panel-mobileHead_cnt">
                <p>{title}</p>
                <div className="search_panel-mobileHead_close" onClick={onClick}>
                    <svg viewBox="0 0 10 10"><path d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default MobileHead;