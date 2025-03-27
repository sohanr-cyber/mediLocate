import mongoose from 'mongoose'

const symptomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            // unique: true
        },

        slug: {
            // URL friendly identifier
            type: String,
            required: true,
            trim: true,
            // unique: true // Ensures unique symptom URLs
        },

        image: {
            type: String
        },

        isShown: {
            type: Boolean,
            default: true
        },
        isFeatured: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

// Create Model
const Symptom =
    mongoose.models.Symptom || mongoose.model('Symptom', symptomSchema)
export default Symptom
