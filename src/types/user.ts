export type UserId = string;

export type User = {
  id: UserId;
  /** Display name. Business data: never translated. */
  name: string;
  /** Unknown in the frontend prototype; the API will fill it in. */
  email: string | null;
};
