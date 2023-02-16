import { Model } from "objection";
import TwitModel from "./twitsModel";

interface Comment {
  id: number;
  comment: string;
  twit_id: number;
}

class CommentModel extends Model {
  static get tableName() {
    return "comments";
  }

  static get relationMappings() {
    return {
      user: {
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