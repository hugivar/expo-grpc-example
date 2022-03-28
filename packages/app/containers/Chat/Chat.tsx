import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';

import {
  ChatMessage,
  ReceiveMsgRequest,
  Empty
} from '@expo-workspaces/app/chat_pb';

import ChatView from './components/ChatView';

interface IChat { 
  client: any;
}
const Chat = ({ client }: IChat) => {
  const [msgList, setMsgList] = useState([]);
  const username = 'Hugo Watts';
  
  useEffect(() => {
    const strRq = new ReceiveMsgRequest();
    strRq.setUser(username);

    const chatStream = client.receiveMsg(strRq, {});
    chatStream.on('data', (response: any) => {
      const from = response.getFrom();
      const msg = response.getMsg();
      const time = response.getTime();

      if (from === username) {
        setMsgList((oldArray) => [
          ...oldArray,
          { from, msg, time, mine: true }
        ]);
      } else {
        setMsgList((oldArray) => [...oldArray, { from, msg, time }]);
      }
    });

    chatStream.on('status', function (status: any) {
      console.log(status.code, status.details, status.metadata);
      throw new Error(status.details);
    });

    chatStream.on('end', () => {
      console.log('Stream ended.');
    });
  }, []);

  function sendMessage(message: string) {
    const msg = new ChatMessage();
    msg.setMsg(message);
    msg.setFrom(username);
    msg.setTime(new Date().toLocaleString());

    client.sendMsg(msg, null, (_: any, response: any) => {
      console.log(response);
    });
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ChatView msgList={msgList} sendMessage={sendMessage} />
    </Layout>
  );
};

export default Chat;
