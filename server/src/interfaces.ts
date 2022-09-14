export interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export interface ServerToClientEvents {
  message: (message: Message) => void;
  initMessages: (messages: Message[]) => void;
  clientNameList: (clients: string[]) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  name: string;
}
