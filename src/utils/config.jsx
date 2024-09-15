import { createChatBotMessage } from 'react-chatbot-kit';
import FruitsList from '../components/FruitList';

const config = {
  botName: "FruitBot",
  initialMessages: [createChatBotMessage("Hi, I'm FruitBot!")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#00bcd4",
      color: "#fff",
    },
    chatButton: {
      backgroundColor: "#00bcd4",
      color: "#fff",
    },
    chatContainer: {
      backgroundColor: "#e0f7fa",
      Width: '200px'
    },
  },
  widgets: [
    {
      widgetName: "fruitsList",
      widgetFunc: (props) => <FruitsList {...props} />,
    },
  ],
};

export default config;