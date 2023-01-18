import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { COMPREFACE_API_KEY, LOCAL_COMPREFACE_API_KEY } from "../config";

interface IServer {
  ip: string;
  compreface_url: string;
  node_url: string;
  setIp: Dispatch<SetStateAction<string>>;
  compreface_api_key: string;
  setLocal: Dispatch<SetStateAction<boolean>>;
}

interface Props {
  children: React.ReactNode;
}

const init_ip = "192.168.0.17";

const ServerContext = createContext<IServer>({
  ip: init_ip,
  setIp: () => {},
  compreface_url: `http://${init_ip}:8000`,
  node_url: `http://${init_ip}:4000`,
  compreface_api_key: "",
  setLocal: () => {},
});

const ServerProvider: React.FC<Props> = ({ children }) => {
  const [ip, setIp] = useState<string>(init_ip);
  const [local, setLocal] = useState<boolean>(true);
  const compreface_url = useMemo<string>(() => `http://${ip}:8000`, [ip]);
  const node_url = useMemo<string>(() => `http://${ip}:4000`, [ip]);
  const compreface_api_key = useMemo<string>(
    () => (local ? LOCAL_COMPREFACE_API_KEY : COMPREFACE_API_KEY),
    [local]
  );

  return (
    <ServerContext.Provider
      value={{
        ip,
        setIp,
        compreface_url,
        node_url,
        compreface_api_key,
        setLocal,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

function useServer() {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error("useServer must be used within a ServerProvider");
  }
  return context;
}

export { ServerProvider, useServer };
