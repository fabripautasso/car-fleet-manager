import { resolve as pathResolve } from "path";
import { config } from "dotenv";

const { env } = process;
config({ path: pathResolve(__dirname, `./env/.env.${env.NODE_ENV}`) });

export default {
  environment: env.NODE_ENV,
  port: Number(env.PORT),
  SQL: {
    name: env.SQL_DB,
    username: env.SQL_USERNAME,
    password: env.SQL_PASSWORD,
    host: env.SQL_HOST,
    port: Number(env.SQL_PORT),
    dialect: env.SQL_DIALECT,
    logging: env.SQL_LOGGING,
  },
  encryptionTransformerConfig: {
    key: env.ENCRYPTION_KEY,
    algorithm: "aes-256-cbc",
    ivLength: 16,
  },
  jwtKey: env.JWT_KEY,
  errorTypes: {
    db: { statusCode: 500, name: "Internal Server Error", message: "database error" },
    validation: { statusCode: 400, name: "Bad Request", message: "validation error" },
    auth: { statusCode: 401, name: "Unauthorized", message: "auth error" },
    forbidden: { statusCode: 403, name: "Forbidden", message: "forbidden content" },
    notFound: { statusCode: 404, name: "Not Found", message: "content not found" },
    unavailableCar: {
      statusCode: 404,
      name: "Not Found",
      message: "The car is already part of another fleet or is not yet in the system",
    },
    entity: { statusCode: 422, name: "Unprocessable Entity", message: "entity error" },
  },
  get errorMap() {
    return {
      ValidateError: this.errorTypes.validation,
      ValidationError: this.errorTypes.validation,
      CastError: this.errorTypes.db,
    };
  },
};
