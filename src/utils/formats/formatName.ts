import { User, Professional } from "../../types";

export const formatName = (user: User | Professional | undefined | null) => {
  if (!user) return "";

  const firstName = user.firstName ? user.firstName.split(" ")[0] : "";
  const lastName = user.lastName ? user.lastName.split(" ")[0] : "";

  return `${firstName} ${lastName}`.trim();
};