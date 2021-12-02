import { Request } from "express";
import * as jwt from "jsonwebtoken";
import constants from "./config/constants";

export type res = { status: number; message: string };

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[],
): Promise<res> {
  if (securityName === "jwt") {
    const token = request.headers["x-access-token"];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      if (typeof token === "string") {
        jwt.verify(token, constants.jwtKey, function(err: any, decoded: any) {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error("Not specified authentication mode."));
    });
  }
}
