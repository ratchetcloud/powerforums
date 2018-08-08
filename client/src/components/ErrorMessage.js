import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div className="container">
            <div className="alert alert-danger">Error: {props.error.message}</div>
        </div>
    )
};
export default ErrorMessage;