import { Model } from "objection";
import UserModel from "./usersModel";
import TwitModel from "./twitsModel";

interface Like {
  id: number;
  user_id: number;
  twit_id: number;
}

class LikeModel extends Model {
  static get tableName() {
    return "likes";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "likes.user_id",
          to: "users.id",
        },
      },
      twit: {
        relation: Model.BelongsToOneRelation,
        modelClass: TwitModel,
        join: {
          from: "likes.twit_id",
          to: "twits.id",
        },
      },
    };
  }
}

export default LikeModel;
