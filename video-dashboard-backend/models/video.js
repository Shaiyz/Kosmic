const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const videoSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title:{
      type:String,
      default:'First Project'
    },
    description:{
      type: String,
    },
    createdBy:{
      type: Schema.Types.ObjectId,
      ref: "users",
      },
      collaborators:[{
        type: Schema.Types.ObjectId,
        ref: "collaborators",

      }]
  },
  { timestamps: true }
);

const Video = mongoose.model("videos", videoSchema);
module.exports = Video;
