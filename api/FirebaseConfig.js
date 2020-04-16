import * as firebase from "firebase";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAey9veizcGkxbfJZs9VLti6g-zS9sfffY",
  authDomain: "store-app-e2438.firebaseapp.com",
  databaseURL: "https://store-app-e2438.firebaseio.com",
  projectId: "store-app-e2438",
  storageBucket: "store-app-e2438.appspot.com",
  messagingSenderId: "300251460069",
  appId: "1:300251460069:web:c7fcfe2b0f476c26497f0c",
  measurementId: "G-0XZ4E9X4JS",
};

firebase.initializeApp(firebaseConfig);

export default class CaisseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ["Day"],
      //   DataTable: this.props.navigation.state.params.JSON_ListView_Clicked_Item,
      FooterTable: ["Total", 0],
      total: 0,
      loading: false,
    };
  }

  componentWillMount() {
    let initialLoad = true;
    this.setState({ loading: true });

    firebase
      .database()
      .ref("recette")
      .on("value", (snapshot) => {
        this.setState({ total: snapshot.val() && snapshot.val().total });

        if (initialLoad) {
          this.setState({ loading: false });
          initialLoad = false;
        }
      });
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
            <Row
              data={state.HeadTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows
              data={
                this.props.navigation.state.params.JSON_ListView_Clicked_Item
              }
              textStyle={styles.TableText}
            />
            <Row
              data={state.FooterTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
          </Table>

          <Button
            title="Go Back"
            onPress={() => this.props.navigation.navigate("Profile")}
          />
        </View>
        <Text style={styles.title}>Store some value in Firebase!</Text>

        <TextInput
          onChangeText={(total) => {
            this.setState({ total });
          }}
          onSubmitEditing={this._saveValue}
          value={this.state.total}
          style={styles.textInput}
        />

        <Button onPress={this._saveValue} title="Save" />

        {this._maybeRenderLoadingOverlay()}
      </View>
    );
  }

  _saveValue = async () => {
    try {
      this.setState({ loading: true });
      await firebase.database().ref("recette").set({ total: this.state.total });
    } catch (e) {
      // Error! oh no
    } finally {
      this.setState({ loading: false });
    }
  };

  _maybeRenderLoadingOverlay = () => {
    if (this.state.loading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    width: Dimensions.get("window").width - 30,
    marginHorizontal: 15,
    padding: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#eee",
    marginVertical: 15,
    height: 50,
    fontSize: 16,
  },
  loadingOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
});
