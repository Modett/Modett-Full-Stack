import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Basic Body Measurements (in inches or cm)
    bust: {
        type: Number,
        required: true,
        min: 0
    },
    waist: {
        type: Number,
        required: true,
        min: 0
    },
    hips: {
        type: Number,
        required: true,
        min: 0
    },
    
    // Additional Body Measurements
    underbust: {
        type: Number,
        min: 0
    },
    shoulderWidth: {
        type: Number,
        min: 0
    },
    armLength: {
        type: Number,
        min: 0
    },
    inseam: {
        type: Number,
        min: 0
    },
    outseam: {
        type: Number,
        min: 0
    },
    thigh: {
        type: Number,
        min: 0
    },
    neckCircumference: {
        type: Number,
        min: 0
    },
    
    // Dress/Top Specific Measurements
    frontLength: {
        type: Number,
        min: 0
    },
    backLength: {
        type: Number,
        min: 0
    },
    sleeveLength: {
        type: Number,
        min: 0
    },
    armhole: {
        type: Number,
        min: 0
    },
    
    // Professional Wear Specific
    jacketLength: {
        type: Number,
        min: 0
    },
    blazerLength: {
        type: Number,
        min: 0
    },
    skirtLength: {
        type: Number,
        min: 0
    },
    pantWaist: {
        type: Number,
        min: 0
    },
    crotchDepth: {
        type: Number,
        min: 0
    },
    
    // Size Information
    standardSize: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        required: true
    },
    cupSize: {
        type: String,
        enum: ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G', 'H']
    },
    
    // Measurement Unit
    unit: {
        type: String,
        enum: ['inches', 'cm'],
        default: 'inches',
        required: true
    },
    
    // Fit Preferences
    fitPreference: {
        type: String,
        enum: ['slim', 'regular', 'loose'],
        default: 'regular'
    },
    
    // Special Notes
    notes: {
        type: String,
        maxlength: 500
    },
    
    // Measurement Status
    isActive: {
        type: Boolean,
        default: true
    },
    
    // Who took the measurement
    takenBy: {
        type: String,
        enum: ['self', 'tailor', 'staff'],
        default: 'self'
    }
}, {
    timestamps: true
})

// Index for faster queries
measurementSchema.index({ userId: 1, isActive: 1 })

const Measurement = mongoose.model('Measurement', measurementSchema);
export default Measurement;