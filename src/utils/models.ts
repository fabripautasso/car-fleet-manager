import { generate } from "randomstring";

export const generateMockUUID = (): string => {
  return `${generate(8)}-${generate(4)}-${generate(4)}-${generate(4)}-${generate(12)}`;
};
