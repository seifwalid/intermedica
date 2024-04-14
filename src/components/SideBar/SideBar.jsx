import React from "react";
import { useState, useContext } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const SideBar = () => {
    const [extended, setExtended] = useState(false);
    const { newChat, chatList, loadChat } = useContext(Context);

    return (
        <div className="sidebar">
            <div className="top">
                <img
                    onClick={() => setExtended((prev) => !prev)}
                    className="menu"
                    src={assets.menu_icon}
                    alt="menu_icon"
                />
                <div className="new-chat" onClick={newChat}>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {chatList.map((chat, i) => {
                            return (
                                <div onClick={() => loadChat(chat.id)} key={i} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    {extended}
                                    <p>{chat.firstPrompt.slice(0,18)}...</p>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};
export default SideBar;
