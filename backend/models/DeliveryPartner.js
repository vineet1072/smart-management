import mongoose from "mongoose";

const DeliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  currentLoad: { type: Number, default: 0, max: 3 },
  areas: { type: [String], required: true },
  shift: {
    start: { type: String, required: true, default: "00:00" }, // HH:mm
    end: { type: String, required: true, default: "00:00" }, // HH:mm
  },
  metrics: {
    rating: { type: Number, default: 5 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
  },
});

const DeliveryPartner = mongoose.model("DeliveryPartner", DeliveryPartnerSchema);

export default DeliveryPartner
