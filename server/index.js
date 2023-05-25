const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { PeerServer } = require("peer");

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello server");
});

let videoRooms = {};
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`user connected by id - ${socket.id}`);
  socket.on("user-login", (data) => loginEventHandler(socket, data));
  socket.on("chat-message", (data) => chatMessageHandler(socket, data));

  socket.on("video-room-create", (data) =>
    videoRoomCreateHandler(socket, data)
  );
  socket.on("video-room-join", (data) => {
    videoRoomJoinHandler(socket, data);
  });
  socket.on("video-room-leave", (data) => {
    videoRoomLeaveHandler(socket, data);
  });

  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
});

const peerServer = PeerServer({ port: 9000, path: "/peer" });

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Socket events

const disconnectEventHandler = (id) => {
  removeOnlineUser(id);
  checkIfUserIsInCall(id);
  broadcastDisconnectedUserDetails(id);
};

const chatMessageHandler = (socket, data) => {
  const { receiverSocketId, content, id } = data;
  if (onlineUsers[receiverSocketId]) {
    io.to(receiverSocketId).emit("chat-message", {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId) => {
  io.to("logged-users").emit("user-disconnected", disconnectedUserSocketId);
};

const loginEventHandler = (socket, data) => {
  socket.join("logged-users");

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
  broadcastVideoRooms();
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });
  return onlineUsersArray;
};

//video sockets
const videoRoomJoinHandler = (socket, data) => {
  const { roomId, peerId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit("video-room-init", {
        newParticipantPeerId: peerId,
      });
    });

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];

    broadcastVideoRooms();
  }
};

const broadcastVideoRooms = () => {
  io.to("logged-users").emit("video-rooms", videoRooms);
};

const videoRoomCreateHandler = (socket, data) => {
  const { peerId, newRoomId } = data;

  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  };

  broadcastVideoRooms();
};

const videoRoomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }

  if (videoRooms[roomId].participants.length > 0) {
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit("video-call-disconnect");
  }
  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  }
  broadcastVideoRooms();
};

const checkIfUserIsInCall = (socket) => {
  Object.entries(videoRooms).forEach(([key, value]) => {
    const participant = value.participants.find(
      (p) => p.socketId === socket.id
    );

    if (participant) {
      removeUserFromTheVideoRoom(socket.id, key);
    }
  });
};

const removeUserFromTheVideoRoom = (socketId, roomId) => {
  videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
    (p) => p.socketId !== socketId
  );
  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  } else {
    io.to(videoRooms[roomId].participants[0].socketId).emit(
      "video-call-disconnect"
    );
  }

  broadcastVideoRooms();
};
