import { Model } from "objection";

export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UsersTableModel extends IUsers {}

class UsersTableModel extends Model {
  static get tableName() {
    return "users";
  }
}

export default UsersTableModel;