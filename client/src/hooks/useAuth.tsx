import { ComponentChildren, Context, createContext } from "preact";
import { FC, useContext } from "preact/compat";

interface IContextAuth {
  user: string;
}

const AuthContext: Context<IContextAuth> = createContext({
  user: "labib",
});

type Props = {
  children: ComponentChildren;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const value = "test";
  return (
    <AuthContext.Provider value={{ user: value }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
