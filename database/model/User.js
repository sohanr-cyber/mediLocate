import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    // User credentials
    email: {
      type: String,
      required: true,
      unique: true // Ensures unique email addresses
    },

    password: {
      type: String,
      // required: true,
      minlength: 6 // Minimum password length for security
    },
    // User details
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      // required: true
    },
    fullName: {
      type: String,
      // required: true
    },
    image: {
      type: String,
    },
    uid: {
      type: String,
    },
    salt: {
      type: String
    },
    // Optional fields
    phoneNumber: {
      type: String
    },

    // User roles (optional)
    role: {
      type: String,
      enum: ['user', 'admin', "doctor"], // Define allowed roles (can be extended)
      default: 'user'
    },

    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    symptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symptom'
      }
    ],
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
      }
    ],
    speciality: {
      type: String,
    },
    workingIn: {
      type: String,
    },

    bmdcNumber: {
      type: String,
    },
    consultationFee: {
      type: String,
    },
    followUpFee: {
      type: String
    },
    avgConsultationTime: {
      type: Number
    },
    patientAttended: {
      type: Number
    },
    about: {
      type: String,
    },
    totalExperience: {
      type: String,
    },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    expirationTime: { type: Date },

  },

  { timestamps: true }
)



const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
