import ShareStatusServices from "../services/shareStatusServices.js";
import { SocketUtil } from "../utils/socketUtils.js";

const shareStatusController = async(req,res) => {
    const newStatus = {
        senderId: req.params.id,
        status: req.body.healthStatus,
      };
    SocketUtil.socketEmit("shareStatus", newStatus);
    const savedStatus = await ShareStatusServices(newStatus)

      return res
        .status(200)
        .json({ message: "Health Status updated.", newStatus: savedStatus });
}

export default shareStatusController