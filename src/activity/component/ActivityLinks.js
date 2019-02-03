import React, { Component } from 'react';
import { isJsonString } from '../../../utils';
import { activity } from '../../../source.config';
import '../activity.scss';

const List = props => {
    const { links, targetBlank} = props;
    return links.map((data, idx) => {
        return (
            <div key={idx}>
                <a 
                    href={data.href} target={ targetBlank ? '_blank' : '_self' }>{data.title}                    
                </a>
            </div>
        );
    });
};
const ActivityLinks = props => {
    const { links, targetBlank  } = props;
    return (
        <div className="activity_links_wrap">
            {<List 
                links={links}
                targetBlank={targetBlank}
            />}
        </div>
    );
};
export default ActivityLinks;
