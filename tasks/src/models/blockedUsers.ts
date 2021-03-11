import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new BlockedUser
interface BlockedUserAttrs {
  userId: string;
}

// An interface that describes the properties
// that a BlockedUser Model has
interface BlockedUsersModel extends mongoose.Model<BlockedUserDoc> {
  build(attrs: BlockedUserAttrs): BlockedUserDoc;
}

// An interface that describes the properties
// that a BlockedUser Document has
interface BlockedUserDoc extends mongoose.Document {
  userId: string;
}

const BlockedUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

BlockedUserSchema.statics.build = (attrs: BlockedUserAttrs) => {
  return new BlockedUser(attrs);
};

const BlockedUser = mongoose.model<BlockedUserDoc, BlockedUsersModel>("BlockedUser", BlockedUserSchema);

export { BlockedUser };
