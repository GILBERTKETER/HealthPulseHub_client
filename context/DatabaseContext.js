import { createContext, useContext, useReducer } from "react";

const DatabaseContext = createContext();

const initialState = {
  hostname: "",
  username: "",
  password: "",
  database: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CREDENTIALS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const DatabaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCredentials = (credentials) => {
    dispatch({ type: "SET_CREDENTIALS", payload: credentials });
  };

  return (
    <DatabaseContext.Provider value={{ state, setCredentials }}>
      {children}
    </DatabaseContext.Provider>
  );
};

const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};

export { DatabaseProvider, useDatabase };
