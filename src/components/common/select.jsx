import React, { Fragment } from 'react';

const Select = ({ items, onItemSelect, label, className, size, optionAppend, name, value }) => {
    return (
        <Fragment>
            {label && <label htmlFor={className}>{label}</label>}
            <select className={className} size={size} onChange={onItemSelect} name={name} value={value}>
                <option key='allCompanies' value='all'>select...</option>
                {items && items.map(item => <option key={item} value={item}>{item + ' ' + optionAppend}</option>)}
            </select>
        </Fragment>
        
    );
}

Select.defaultProps = {
    label: '',
    className: 'form-control',
    size: 0,
    optionAppend: ''
}
export default Select;