import * as firebase from "firebase";
import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import { db } from "../screens/CaisseScreen";

// let recetteRef = db.ref("/recette");
// recetteRef.on("value"),
//   function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//       var data = childSnapshot.val();
//       console.log(data);
//     });
//   };
export default class ArchivesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      HeadTable: ["Day", "Caisse", "Profit"],
      Archives: [],
      loading: false,
      DataTable: [
        ["1", "2", "3"],
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["a", "b", "c"],
        ["1", "2", "3"],
      ],
    };
  }

  // readUserData = async () => {
  //   try {
  //     this.setState({ loading: true });
  //     await firebase
  //       .database()
  //       .ref("recette")
  //       .once("value", function (snapshot) {
  //         snapshot.forEach(function (child) {
  //           child.forEach(function (caisse) {
  //             let Archives = caisse.val();
  //             this.setState({ Archives });
  //             console.log(caisse.key + caisse.total + ": " + caisse.val());
  //           });
  //         });
  //       });
  //   } catch (e) {
  //     // Error! oh no
  //   } finally {
  //     this.setState({
  //       loading: false,
  //       // Archives: this.state.Archives.push(caisse.val()),
  //     });
  //   }
  // };
  // componentWillUpdate() {
  //   recetteRef.on("value", (snapshot) => {
  //     snapshot.forEach(function (child) {
  //       let data = child.val();
  //       let Archives = Object.values(data);
  //       console.log("Archives :" + Archives);
  //       this.setState({ Archives: Archives });
  //       return this.state.Archives;
  //     });
  //   });
  // }
  render() {
    const state = this.state;

    console.log("Archives :" + state.Archives);

    return (
      <View style={styles.container}>
        <Button
          title="Homepage"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
        <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
          <Row
            data={state.HeadTable}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows data={state.Archives} textStyle={styles.TableText} />
        </Table>
        <Button title="Display Archives Table" />
        {/*</Button> */}
      </View>
    );
  }
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
});
