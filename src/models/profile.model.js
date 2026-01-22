import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    links: [String],
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    education: String,
    skills: {
      type: [String],
      index: true,
    },
    projects: {
      type: [projectSchema],
      default: [],
    },
    work: String,
    links: {
      github: String,
      linkedin: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

// text index for search endpoint
profileSchema.index({
  name: "text",
  skills: "text",
  "projects.title": "text",
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
