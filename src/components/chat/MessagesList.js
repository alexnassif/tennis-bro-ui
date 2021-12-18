import React from "react";

import "../../styling/messages.css";

const MessagesList = ({messages, username, userId}) => {

    const messageList = messages.map((item, index) => {
        if(item.user === userId){

            return (
                <div className="media w-50 mb-3"><img
                    src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user"
                    width="50" className="rounded-circle"/>
                    <div className="media-body ml-3">
                        <div className="bg-light rounded py-2 px-3 mb-2">
                            <p className="text-small mb-0 text-muted">{username}: {item.text}</p>
                        </div>
                        <p className="small text-muted">ME</p>
                    </div>
                </div>

            )
        }else {
            return (

                <div className="media w-50 ml-auto mb-3">
                    <div className="media-body">
                        <div className="bg-primary rounded py-2 px-3 mb-2 ">
                            <p className="text-small mb-0 text-white">Me: {item.text}</p>
                        </div>
                    </div>
                </div>


            )
        }
    });

    return(
        <div className="col-7 px-0">
            <div className="px-4 py-5 chat-box bg-white">
                {messageList}
            </div>
        </div>

    )


}

export default MessagesList;