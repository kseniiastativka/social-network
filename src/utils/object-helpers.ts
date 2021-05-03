import { User } from "../redux/redux-store";

export const updateObjInArray = (
  items: User[],
  itemId: number,
  newObjProps: Record<string, unknown>
) =>
  items.map((user) => {
    if (user.id === itemId) {
      return { ...user, ...newObjProps };
    }
    return user;
  });
