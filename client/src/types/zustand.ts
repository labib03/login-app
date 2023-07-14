type AuthStoreType = {
  userName: string;
  active: boolean;
};

export interface AuthStoreInterface {
  auth: AuthStoreType;
  setUsername: (name: string) => void;
}
