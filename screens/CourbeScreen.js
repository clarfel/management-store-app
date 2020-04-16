import React, { Component } from "react";
import { View, Text } from "react-native";
export default class CourbeScreen extends Component {
  render() {
    return (
      <View>
        <Text>Courbe de croissance</Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
      </View>
    );
  }
}
