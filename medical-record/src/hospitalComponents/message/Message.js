import "./message.css";
import { format } from "timeago.js";
import ProfilePic from "../../img/ProfilePic.png";

export default function Message({ message, own }) {
  // console.log("message.text", message.text);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={ProfilePic} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
