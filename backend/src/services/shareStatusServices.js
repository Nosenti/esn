import Citizen from '../models/Citizen.js';

const ShareStatusServices = async(newStatus)=> {
    const status = await Citizen.findByIdAndUpdate(
    newStatus.senderId,
    { $set: { healthStatus: newStatus.status } },
    {new: true},
    );
    return status;
  }

export default ShareStatusServices