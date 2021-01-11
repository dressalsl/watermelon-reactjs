import React from 'react';

export default (props) => {
    return (
        <div className="card border-primary">
            <div className="card-header">
                {props.header}
            </div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
        
    )
}