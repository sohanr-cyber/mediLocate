import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming patient is also a User
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // doctor role
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: false,
    },

   
    // Serial number / token
    serial: {
      type: Number,
      required: true,
    },

    // Time slot in hh:mm format or start/end times
    dateOfConsultation: {
      type: Date,
    },

    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },

    // Fees
    consultationFee: {
      type: Number,
      required: true,
    },

    followUpFee: {
      type: Number,
      default: 0,
    },

    // Appointment status
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending",
    },
    statusTimeline: [
      {
        status: {
          type: String,
          // enum: [
          //   'Pending',
          //   'Processing',
          //   'Confirmed',
          //   'Packing',
          //   'Packed',
          //   'Delivering',
          //   'Delivered'
          // ],
          required: true,
          default: 'Pending'
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    // Optional notes / symptoms provided by patient
    symptoms: {
      type: String,
      default: "",
    },

    // Payment info (optional, can integrate later)
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
