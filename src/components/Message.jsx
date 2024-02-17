import React from 'react'

const Message = ({ message, sender }) => {
    function extractTime(timestamp) {
        return timestamp?.slice(11, 16);
    }
    const senderStyle = {
        borderRadius: '7px',
        backgroundColor: '#9fd3c7',
        width: 'fit-content',
        maxWidth: '300px'
    }
    const receiverStyle = {
        borderRadius: '7px',
        backgroundColor: '#ececec',
        width: 'fit-content',
        maxWidth: '300px'
    }
    return (
        <div className="row justify-content-end">
            <div className={`${sender ? 'ms-auto me-5' : 'me-auto ms-5 '} m-1`} style={sender ? senderStyle : receiverStyle}>
                <div className="my-1" >
                    {message.content}
                </div>
                <div className="d-flex justify-content-end">
                    <small>{extractTime(message.sent_at)}</small>
                </div>

            </div>
        </div>
    )
}

export default Message