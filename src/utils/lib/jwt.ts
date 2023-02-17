import jwt, { JwtPayload } from "jsonwebtoken";

interface IUserDetails {
  name: string;
  id: number;
}

export default class JWT {
  /**
   * Extract user id from a valid access token.
   */
  static verifyAccessToken(token: string): IUserDetails | null {
    try {
      let payload = jwt.verify(
        token,
        String(process.env.JWT_SECRET)
      ) as JwtPayload;
      let { name, id } = payload;
      return { name: String(name), id: Number(id) };
    } catch (e) {
      return null;
    }
  }

  /**
   * Generate access token for app setup
   */
  static generateAccessToken(id: number, name: string, expiresIn: string): string {
    let data: JwtPayload = {
      id: Number(id),
      name: String(name),
    };

    return jwt.sign(data, String(process.env.JWT_SECRET), {
      expiresIn,
    });
  }
}