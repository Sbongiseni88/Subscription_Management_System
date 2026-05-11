import mongoose from "mongoose";

// This schema defines the structure of a subscription plan in our database.
// It tracks details like price, frequency, and when it needs to be renewed.

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['ZAR', 'USD', 'EUR'], // Only these three currencies are allowed
        default: 'ZAR'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'tech', 'finance', 'politics', 'other']
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(), // Ensures the start date is not in the future
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        // No required: true here because we calculate it automatically below
        validate: {
            validator: function (value) {
                return value > this.startDate; // Ensures renewal is always after the start
            },
            message: 'Renewal date must be after the start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Links the subscription to a specific User
        ref: 'User',
        required: true,
        index: true // Makes searching for subscriptions by user much faster
    }
}, { timestamps: true });

// Auto-calculate renewal date before saving if it's not provided
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        // Calculate renewal based on the start date and the frequency (e.g., monthly = +30 days)
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto-update the status to 'expired' if the renewal date has already passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;