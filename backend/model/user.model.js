const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const projectSchema = new mongoose.Schema({
    name: String,
    stack: [String]
});

const experienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    duration: String,
    projects: [projectSchema]
});

const skillSchema = new mongoose.Schema({
    name: String,
    level: String
});



const userSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 18, max: 100 },
    userId: {type:String},
    hobbies: { type: [String], required: true },
    isAdmin: { type: Boolean, default: false },
    skills: [skillSchema],
    experience: [experienceSchema],
    description: { type: String },
    password: { type: String, required: true },


    address: { street: { type: String, required: true }, city: { type: String, required: true }, state: { type: String, required: true }, zip: { type: String, required: true } },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }


}
);
//single field index
userSchema.index({ email: 1 });

//compound index
userSchema.index({ email: 1, age: 1 });
//text index

userSchema.index({ description: "text" });
//geospatial index
userSchema.index({ location: "2dsphere" });
//hash index
userSchema.index({ email: 1 }, { unique: true });
//multikey index
userSchema.index({ skills: 1 });

//hashed index
userSchema.index({ userId: "hashed" });
//partial index
userSchema.index({ isAdmin: 1 }, { partialFilterExpression: { isAdmin: true } });
//sparse index
userSchema.index({ address: 1 }, { sparse: true });
//nested index
userSchema.index({ "experience.company": 1 });
//nested index
userSchema.index({ "experience.projects.stack": 1 });
//nested index
userSchema.index({ "experience.projects.name": 1 });
userSchema.index({"address.city": 1});

//wildcard index
userSchema.index({ "$**": 1 });

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      this.password = await bcrypt.hash(this.password, salt);
      console.log(this.password);
    }
    next();
  });
  
  // Compare the input password with the stored hash
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };




module.exports = mongoose.model("User", userSchema);


