import { Model } from "objection";
import UserModel from "./usersModel";

interface Twit {
  id: number;
  twit: string;
  attachment?: string | null;
  likes?: number | null;
  userId: number;
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
          from: "twits.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default TwitModel;