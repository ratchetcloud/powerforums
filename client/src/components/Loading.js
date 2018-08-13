import React from 'react';

const Loading = () => {
    const spinner = {
        fontSize: '40px',
        color: '#a5a5a5',
    };

    return (
        <div className="container mt-5 text-center">
            <i className="fas fa-spinner fa-spin" style={spinner} />
        </div>
    )
};
export default Loading;