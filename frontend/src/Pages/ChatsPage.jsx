import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useParams } from "react-router-dom";

const ChatsPage = (props) => {
  // Check if props.user is defined before accessing its properties
  const {username} = useParams();

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="d1b17352-9ee5-46ef-a7cc-80ddd7bb29bb"
        username={username}
        secret="S1234"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
