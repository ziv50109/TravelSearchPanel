import React from 'react';
import VacationSearch from './pc';
import VacationSearchM from './mobile';

const Preview = () => {
    return (
        <React.Fragment>
            <h2>PC版</h2>
            <VacationSearch />
            <h2>Mobile版</h2>
            <VacationSearchM />
        </React.Fragment>
    );
};

export default Preview;