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
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

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

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

export default class CaisseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ["Day"],
      DataTable: [],
      FooterTable: ["Total", 0],
      total: 0,
      profit: 0,
      date: "",
      loading: false,
    };
  }
  // componentDidUpdate() {
  //   db.ref("/caisse").once("value", function (snapshot) {
  //     snapshot.forEach(function (child) {
  //       let caisse = this.state.DataTable.push(
  //         child.val().name,
  //         child.val().price
  //       );
  //       this.setState({
  //         DataTable: caisse,
  //       });
  //     });
  //   });
  // }
  // componentDidMount() {
  //   firebase.database().ref().child()
  // }
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
  // componentDidMount() {
  //   db.ref("/caisse").on("value", (snapshot) => {
  //     var data = snapshot.val();

  //     console.log("snapshot.val() :", snapshot.val());

  //     // let caisse = Object.values(data);
  //     // console.log("Object.values(data) :", Object.values(data));
  //     this.state.DataTable.push(data);
  //   });
  //   return this.state.DataTable;
  // }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button title="Open" onPress={this.readUserData} />
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
            <Row
              data={state.HeadTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows
              data={
                this.props.navigation.state.params.JSON_ListView_Clicked_Items
              }
              // data={state.DataTable}
              textStyle={styles.TableText}
            />
            <Row
              data={
                this.props.navigation.state.params.JSON_ListView_Clicked_Item
              }
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
          </Table>

          <Button
            title="Go Back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <Text style={styles.title}>Store your total and profit</Text>
        <TextInput
          onChangeText={(date) => {
            this.setState({ date });
          }}
          onSubmitEditing={this._saveValue}
          value={this.state.date}
          style={styles.textInput}
          placeholder="Date"
        />

        <TextInput
          onChangeText={(profit) => {
            this.setState({ profit });
          }}
          onSubmitEditing={this._saveValue}
          value={this.state.profit}
          style={styles.textInput}
          placeholder="Profit"
        />

        <TextInput
          onChangeText={(total) => {
            this.setState({ total });
          }}
          onSubmitEditing={this._saveValue}
          value={this.state.total}
          style={styles.textInput}
          placeholder="Total"
        />

        <Button onPress={this._saveValue} title="Save" />
      </View>
    );
  }
  // readUserData = async () => {
  //   try {
  //     this.setState({ loading: true });
  //     await firebase
  //       .database()
  //       .ref("/caisse")
  //       .once("value", function (snapshot) {
  //         snapshot.forEach(function (child) {
  //           child.forEach(function (caisse) {
  //             console.log(caisse.key + caisse.name + ": " + caisse.val());
  //           });
  //         });
  //       });
  //   } catch (e) {
  //     // Error! oh no
  //   } finally {
  //     this.setState({
  //       loading: false,
  //       DataTable: this.state.DataTable.push(caisse.val()),
  //     });
  //   }
  // };
  _saveValue = async () => {
    try {
      this.setState({ loading: true });
      await firebase.database().ref("/recette").push({
        total: this.state.total,
        profit: this.state.profit,
        date: this.state.date,
      });
    } catch (e) {
      // Error! oh no
    } finally {
      this.setState({ loading: false });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 10,
  },
  header: {
    height: 60,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    alignItems: "center",
    width: "100%",
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  textInput: {
    width: "90%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: "gray",
    borderBottomWidth: 2,
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableHighlight: {
    backgroundColor: "white",
    marginVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
});
