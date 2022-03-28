import React from "react";
import { View } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";

interface IChat {
  from: string;
  msg: string;
  time: string;
};

interface IChatCard {
  chat: IChat
};

interface IChatView {
  msgList: IChat[];
  sendMessage: any;
};


const ChatCard = ({ chat }: IChatCard) => {
  return (
    <>
      <View>
        <Text>{chat?.from}</Text>
      </View>
      <View>
        <View>
          <Text>{chat?.msg}</Text>
        </View>
        <View>
          <Text>{chat?.time}</Text>
        </View>
      </View>
    </>
  );
};

const ChatView = ({ msgList, sendMessage }: IChatView) => {
  const [value, setValue] = React.useState("");

  const handleSendMessage = () => {
    sendMessage(value);
    setValue("");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingTop: 16,
        flexDirection: "column"
      }}
    >
      <View style={{ flex: 1 }}>
        <Text category="h5">Group Messages</Text>
      </View>
      {msgList?.map((chat, i) => (
        <ChatCard chat={chat} key={i} />
      ))}
      <View style={{ flex: 1, paddingTop: 32 }}>
        <Input
          placeholder="Place your Text"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 0
        }}
      >
        <Button onPress={handleSendMessage}>BUTTON</Button>
      </View>
    </View>
  );
};

export default ChatView;
