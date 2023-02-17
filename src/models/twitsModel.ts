import { Model } from "objection";
import UserModel from "./usersModel";

interface Twit {
  id: number;
  twit: string;
  attachment?: string | null; // twits may come with video, images or any file
  likes: number;
  user_id: number;
}

class TwitModel extends Model {
  static get tableName() {
    return "twits";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "twits.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default TwitModel;