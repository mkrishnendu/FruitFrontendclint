import { createChatBotMessage } from 'react-chatbot-kit';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;

    this.fruitDetails = {
      Apple: "Apples are crisp, juicy fruits packed with fiber and vitamins, commonly enjoyed fresh or in desserts. They come in various colors, including red, green, and yellow, with each type offering a slightly different flavor.",
      Banana: "Bananas are a potassium-rich fruit that provides a quick source of energy. They're known for their sweet flavor and are often used in smoothies, snacks, and baked goods",
      Cherry: "Cherries are rich in antioxidants and vitamin C.",
      Mango: "Known as the king of fruits, mangoes are tropical, sweet, and juicy, with a rich flavor that can be eaten fresh or blended into juices. They are also a great source of vitamins A and C.",
      Orange: "Oranges are citrus fruits that are rich in vitamin C, known for their tangy and refreshing flavor. They're often eaten fresh, juiced, or used in cooking for a citrusy zest.",
      Strawberry: "Strawberries are small, heart-shaped berries with a sweet taste and a vibrant red color. They are popular in desserts, smoothies, or enjoyed on their own, offering a boost of antioxidants."
    };
  }

  greet() {
    const message = this.createChatBotMessage("Hello! I'm here to assist you with fruit information. Type 'fruit' to see a list of fruits.");
    this.updateChatbotState(message);
  }

  help() {
    const message = this.createChatBotMessage("I can help you with fruit details. Just type the name of a fruit.");
    this.updateChatbotState(message);
  }

  showFruitsList() {
    const message = this.createChatBotMessage("Here are some fruits you can ask about:", {
      widget: "fruitsList",
    });
    this.updateChatbotState(message);
  }

  showFruitDetails(fruit) {
    const details = this.fruitDetails[fruit] || "Details not available";
    const message = this.createChatBotMessage(`Here are the details for ${fruit}: ${details}`);
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;