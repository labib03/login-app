type AuthStoreType = {
  username: string;
  active: boolean;
};

export interface AuthStoreInterface {
  auth: AuthStoreType;
  setUsername: (name: string) => void;
}
