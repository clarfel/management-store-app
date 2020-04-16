import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
} from "react-native";

export default class ProfileScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.page}>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {this.props.navigation.getParam("username")}
        </Text>
        <View style={styles.container}>
          <Image
            source={require("../assets/store.jpg")}
            style={styles.welcomeImage}
          />
          <Button
            title="Store"
            onPress={() => this.props.navigation.navigate("Store")}
          />
        </View>
        <View style={styles.container}>
          <Image
            source={require("../assets/archives.jpg")}
            style={styles.welcomeImage}
          />
          <Button
            title="Archives"
            onPress={() => this.props.navigation.navigate("Archives")}
          />
        </View>
        <View style={styles.container}>
          <Image
            source={require("../assets/Courbe.png")}
            style={styles.welcomeImage}
          />
          <Button
            title="Courbes"
            onPress={() => this.props.navigation.navigate("Courbe")}
          />
        </View>
        <Button
          title="Sign out"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </ScrollView>
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
  page: {
    // display: flex,
  },
});
