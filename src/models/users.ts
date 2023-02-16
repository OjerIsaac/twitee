import { Model } from "objection";

interface UsersTable {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UsersTableModel extends UsersTable {}

class UsersTableModel extends Model {
  static get tableName() {
    return "users";
  }
}

export default UsersTableModel;