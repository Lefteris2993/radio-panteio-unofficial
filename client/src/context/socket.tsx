import React from 'react';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import configuration from 'utils/configuration';
import { ClientToServerEvents, Message, ServerToClientEvents } from 'utils/interfaces';

interface SocketContextInterface {
  usersList: string[];
  connected: boolean;
  userName: string | undefined;
  newMessages: Observable<Message>;
  initMessages: Message[];
  setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
  connect: () => void;
  disconnect: () => void;
  sentMessage: (message: string) => void;
}

interface SocketProviderInterface {
  children: JSX.Element | JSX.Element[];
}

const defaultContext: SocketContextInterface = {
  usersList: [],
  connected: false,
  userName: undefined,
  newMessages: new Observable<Message>(),
  initMessages: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUserName: (value: React.SetStateAction<string | undefined>) => {},
  connect: () => {},
  disconnect: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sentMessage: (message: string) => {},
};

export const SocketContext = React.createContext<SocketContextInterface>(defaultContext);

// eslint-disable-next-line no-underscore-dangle
const _newMessages = new BehaviorSubject<Message>({
  sender: '',
  message: '',
  timestamp: '',
});

const newMessages = _newMessages.asObservable();

export function SocketProvider({ children }: SocketProviderInterface) {
  const [userName, setUserName] = React.useState<string>();
  const [usersList, setUsersList] = React.useState<string[]>([]);
  const [initMessages, setInitMessages] = React.useState<Message[]>([]);
  const [connected, setConnected] = React.useState<boolean>(false);
  const [socket, setSocket] = React.useState<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const sentMessage = (message: string) => {
    socket?.emit('message', message);
  };

  const connect = () => {
    if (userName === undefined) {
      throw new Error('User name is undefined');
    }
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      configuration.serverUrl,
      {
        query: {
          name: userName,
        },
      },
    );
    setSocket(newSocket);
  };

  const disconnect = () => {
    if (!socket?.connected) {
      return;
    }
    socket.disconnect();
    setConnected(false);
  };

  React.useEffect(() => {
    if (socket === undefined) return () => {};

    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log(reason);
      setConnected(false);
      setUsersList([]);
      setInitMessages([]);
    });

    socket.on('clientNameList', (clients) => {
      setUsersList(clients);
    });

    socket.on('message', (message) => {
      _newMessages.next(message);
    });

    socket.on('initMessages', (messages) => {
      setInitMessages(messages);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('clientNameList');
      socket.off('message');
    };
  }, [socket]);

  const contextValue = React.useMemo<SocketContextInterface>(() => ({
    usersList,
    connected,
    newMessages,
    userName,
    initMessages,
    setUserName,
    connect,
    disconnect,
    sentMessage,
  }), [usersList, connected, userName, initMessages]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}
