const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const  patientSchema = new mongoose.Schema(
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        },
      resetPasswordToken: {
        type: String,
        required: false
      },
      resetPasswordExpiry: {
        type: Date,
        required: false
      }
    },
    { timestamps: true }
  );


  patientSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      try {
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        return next(error);
      }
      //Send welcome email
      //sendMail('registration', this.email, { name: this.name })
    }
    next();
  });


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;