import axios from "axios";
import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  state = {
    historique: [],
  };
  async componentDidMount() {
    // await this.ApiHistorique();
    const apiRes = await axios.post("https://dev.beprowd.fr/webchat-history", {
      auth:
        "53616c7465645f5f30c3fbcab5721e791de5c170251741079bc752ffed341158bbbfa3a8d3e413f32519ab3bdd2d9e73e3d8d9310094281d2aa23537720c3d8dbfcb7d59be889f82e8ccae57e8e7b0af",
      conversation_id: "114548-4542457-142424-452452-webchat",
      type: "get",
      lookback: "2020-12-10T19:37:28.622Z",
    });
    this.setState({
      historique: apiRes.data,
    });
    console.log(apiRes);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.historique.map((message) =>
          message.type === "user_message" ? (
            <Text style={styles.userMessage}>{message.message}</Text>
          ) : (
            message.message.map((botMessage) =>
              botMessage.type == "text" ? (
                <Text style={styles.botMessage}>{botMessage.content}</Text>
              ) : (
                ""
              )
            )
          )
        )}
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  userMessage: {
    backgroundColor: "#98FF69",
  },
  botMessage: {
    backgroundColor: "#69C1FF",
  },
});
