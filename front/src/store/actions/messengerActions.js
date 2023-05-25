import { v4 as uuid } from "uuid";
import store from "../store";
import { addChatMessage, addChatbox } from "../../Messenger/messengerSlice";
import * as socketConn from "../../socketConnection/socketConn";

export const sendChatMessage = (receiverSocketId, content) => {
  const message = {
    content,
    receiverSocketId,
    id: uuid(),
  };

  socketConn.SendChatMessage(message);
  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    })
  );
  openChatboxIfClosed(messageData.senderSocketId);
};

const openChatboxIfClosed = (socketId) => {
  const chatbox = store
    .getState()
    .messenger.chatboxes.find((chatbox) => chatbox.socketId === socketId);
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username;
  if (!chatbox) {
    store.dispatch(addChatbox({ socketId, username }));
  }
};
