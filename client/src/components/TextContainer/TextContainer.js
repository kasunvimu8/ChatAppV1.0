import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import "./TextContainer.css";

export default function TextContainer({users}) {
    return (
        <div className="textContainer">
            <div>
                <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
            </div>

            {
                users && users.length > 0 ? (
                    <div>
                        <h2>People currently chatting :</h2>
                        <div className="activeContainer">
                            <h2>
                                {users.map((user) => (
                                    <div key={user.name} className="activeItem">
                                        <img alt="online_icon" src={onlineIcon}/>
                                        <div className="spancingIcon">
                                            {user.name}
                                        </div>
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                ) : null
            }
            
        </div>
    )
}
