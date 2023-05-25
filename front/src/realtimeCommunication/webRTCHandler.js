import { setLocalStream, setRemoteStream } from "./videoRoomsSlice";
import store from "../store/store";
import { Peer } from "peerjs";

let peer;
let peerId;

export const getPeerId = () => {
  return peerId;
};

export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  if (localStream) {
    store.dispatch(setLocalStream(localStream));
  }

  return Boolean(localStream);
};

export const connectWithPeerServer = () => {
  peer = new Peer(undefined, {
    host: "localhost",
    port: 9000,
    path: "/peer",
  });

  peer.on("open", (id) => {
    peerId = id;
  });

  peer.on("call", async (call) => {
    const localStream = store.getState().videoRooms.localStream;

    call.answer(localStream);

    call.on("stream", (remoteStream) => {
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
};

export const call = (data) => {
  const { newParticipantPeerId } = data;

  const localStream = store.getState().videoRooms.localStream;

  let peerCall;
  if (!!peer) {
    peerCall = peer.call(newParticipantPeerId, localStream);
    peerCall.on("stream", (remoteStream) => {
      store.dispatch(setRemoteStream(remoteStream));
    });
  }
};

export const disconnect = () => {
  if (peer && peer.connections) {
    for (let conns in peer.connections) {
      peer.connections[conns].forEach((c) => {
        c.peerConnection.close();

        if (c.close) c.close();
      });
    }
  }

  store.dispatch(setRemoteStream(null));
};
