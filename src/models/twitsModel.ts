import { Model } from "objection";
import UserModel from "./usersModel";
import LikeModel from "./likesModel";

export interface ITwit {
  id?: number;
  twit: string;
  likes: number;
  attachment?: string | null; // twits may come with video, images or any file
  user_id: number;
}

interface TwitModel extends ITwit {}

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
      likes: {
        relation: Model.HasManyRelation,
        modelClass: LikeModel,
        join: {
          from: "twits.id",
          to: "likes.twit_id",
        },
      }
    }
  }
}

export default TwitModel;