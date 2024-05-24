import { Server } from "socket.io";

export class SocketUtil {
  static socketEmit(key, data) {
    if (SocketUtil.io) {
      SocketUtil.io.sockets.emit(key, data);
    }
  }
  static config(server) {
    SocketUtil.io = new Server(server, { cors: { origin: "*" } });

    SocketUtil.io.on("connection", (socket) => {
      console.log("User connected", socket.id);
      socket.on("join_room", (data) => {
        socket.join(data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  }
}
