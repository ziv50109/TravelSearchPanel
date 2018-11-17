import React from 'react';

// 自由行的出發地
const VacationDaparture = ({
    data,
    onChange,
}) => {
    const keys = Object.keys(data);
    return (
        <div className="vacation_select_group">
            <label htmlFor="departure" className="request">出發地</label>
            <select name="departure" id="departure" className="vacation_select" onChange={onChange}>
                {
                    !keys.length ?
                        null :
                        keys.map(v => (
                            <option key={v} value={v}>{data[v]}</option>
                        ))
                }
            </select>
        </div>
    );
};

export default VacationDaparture;