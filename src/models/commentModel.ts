import { Model } from "objection";
import TwitModel from "./twitsModel";
import UsersTableModel from "./usersModel";

export interface IComment {
  id?: number;
  comment: string;
  user_id: number;
  twit_id: number;
}

interface CommentModel extends IComment {}

class CommentModel extends Model {
  static get tableName() {
    return "comments";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersTableModel,
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
      twit: {
        relation: Model.BelongsToOneRelation,
        modelClass: TwitModel,
        join: {
          from: "comments.twit_id",
          to: "twits.id",
        },
      },
    };
  }
}

export default CommentModel;