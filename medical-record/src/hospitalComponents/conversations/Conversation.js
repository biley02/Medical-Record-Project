import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

import ProfilePic from "../../img/ProfilePic.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8080/hospital/getFriends/${friendId}`
        );
        console.log("friends", res.data.friends);
        setUser(res.data.friends);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={ProfilePic} alt="" />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
