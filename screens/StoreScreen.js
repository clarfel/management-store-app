import * as firebase from "firebase";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Modal,
  TouchableHighlight,
  Button,
  Image,
  Alert,
} from "react-native";
import Data from "../Data";
import PropTypes from "prop-types";
import { db } from "./CaisseScreen";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import { Button } from "@material-ui/core";
import AddItem from "./AddItem";
// import ListItem from "./ListItem";

let itemsRef = db.ref("/items");
// const addToCart = () => {
//   db.ref("/caisse").push({
//     name: this.state.items.name,
//     price: this.state.items.pprice,
//   });
// };
export default class StoreScreen extends Component {
  // static propTypes = {
  //   items: PropTypes.array.isRequired,
  // };
  constructor(props) {
    super(props);
    this.initData = Data;
    this.state = {
      HeadTable: ["Day"],
      FooterTable: ["Total", 0],
      data: this.initData,
      sold: 0,
      isModalVisible: false,
      inputText: "",
      editedItem: 0,
      price: 0,
      dataTable: [],
      loading: false,
      Products: [],
      items: [],
      name: "",
    };
  }
  componentDidMount() {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  // setModalVisible = (bool) => {
  //   this.setState({ isModalVisible: bool });
  // };

  // setInputText = (text) => {
  //   this.setState({ inputText: text });
  // };

  // setEditedItem = (id) => {
  //   this.setState({ editedItem: id });
  // };

  // handleEditItem = (editedItem) => {
  //   const newData = this.state.data.map((item) => {
  //     if (item.id === editedItem) {
  //       item.text = this.state.inputText;
  //       item.price = this.state.price;
  //       return item;
  //     }
  //     return item;
  //   });
  //   this.setState({ data: newData });
  // };
  getItemsToCart = () => {
    db.ref("/caisse").on("value", (snapshot) => {
      let data = snapshot.val();
      let dataTable = Object.values(data);
      console.log("dataTable :", dataTable);
      this.setState({ dataTable });
    });
  };

  addItemsToCart = (item) => {
    db.ref("/caisse").push({
      name: item.name,
      price: item.price,
    });
    Alert.alert("Product sold");
  };
  totalCalcul = (item) => {
    this.state.FooterTable[1] = parseInt(this.state.FooterTable[1]);
    item.price = parseInt(item.price);
    this.setState({
      FooterTable: [
        this.state.FooterTable[0],
        (this.state.FooterTable[1] += item.price),
      ],
    });
    return this.state.FooterTable;
  };
  handleInputChange = (price) => {
    if (/^\d+$/.test(price)) {
      this.setState({
        price: price,
      });
    }
  };
  // renderItem = ({ item }) => (
  //   <TouchableHighlight
  //     onPress={() => {
  //       this.setModalVisible(true);
  //       this.setInputText(item.text),
  //         this.setEditedItem(item.id),
  //         this.handleInputChange(item.price);
  //     }}
  //     underlayColor={"#f1f1f1"}
  //   >
  //     <View style={styles.item}>
  //       {/* <View style={styles.marginLeft}>
  //         <View style={[styles.menu, { backgroundColor: item.color }]}></View>
  //         <View style={[styles.menu, { backgroundColor: item.color }]}></View>
  //         <View style={[styles.menu, { backgroundColor: item.color }]}></View>
  //       </View> */}
  //       <Button
  //         title="Sell"
  //         onPress={() => {
  //           this.addItemsToCart(item);
  //           this.totalCalcul(item);
  //         }}
  //       />
  //       <Text style={styles.text}> {item.text} </Text>
  //       <Text style={styles.text}>Price: {item.price} $ </Text>
  //       <Text style={styles.text}>Stock: {item.stock}/u </Text>
  //       {/* <Button title="+"></Button> */}
  //       {/* <TouchableHighlight
  //         onPress={() => {
  //           this.addItemsToCart(item.id);
  //         }}
  //         style={[styles.text, { backgroundColor: "orange" }]}
  //         underlayColor={"#f1f1f1"}
  //       >
  //         <Text style={styles.text}>Save</Text>
  //       </TouchableHighlight> */}
  //     </View>
  //   </TouchableHighlight>
  // );
  // readUserData = async () => {
  //   try {
  //     this.setState({ loading: true });
  //     await firebase
  //       .database()
  //       .ref("ProductList")
  //       .once("value", function (snapshot) {
  //         snapshot.forEach(function (child) {
  //           child.forEach(function (data) {
  //             console.log("data: " + data.val());
  //           });
  //         });
  //       });
  //   } catch (e) {
  //     // Error! oh no
  //   } finally {
  //     this.setState({
  //       loading: false,
  //       productList: data,
  //     });
  //   }
  // };
  render() {
    console.log(this.state.dataTable);
    console.log(this.state.FooterTable[1]);

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.contentContainer}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>
            
          </Text>
        </View> */}
        {/* <TextInput
          onChangeText={(Products) => {
            this.setState({ Products });
          }}
          onSubmitEditing={this._saveValue}
          value={this.state.Products}
          style={styles.textInput}
        />
        <Button
          style={styles.button}
          onPress={this._saveValue}
          title="Add"
        /> */}
        <AddItem />
        {/* <Button
          onPress={() => {
            this.setModalVisible(true);
            this.setInputText(item.text),
              this.setEditedItem(item.id),
              this.handleInputChange(item.price);
          }}
          title="Add"
        /> */}
        {/* <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        /> */}
        {/* <Button
          style={styles.button}
          onPress={this.readUserData}
          title="Open store"
        /> */}

        <View>
          <View style={styles.itemsList}>
            {this.state.items.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.itemtext}>
                    {item.name} Price:{item.price}
                  </Text>
                  <Button
                    title="Sell"
                    onPress={() => {
                      this.addItemsToCart(item);
                      this.totalCalcul(item);
                      this._saveValue;
                      this.getItemsToCart;
                    }}
                  />
                </View>
              );
            })}
          </View>
          <Image
            source={require("../assets/caisse.jpg")}
            style={styles.caisse}
          />
          <Button
            style={styles.button}
            title="Caisse"
            //Button Title
            onPress={() =>
              navigate("Caisse", {
                JSON_ListView_Clicked_Items: this.state.dataTable,
                JSON_ListView_Clicked_Item: this.state.FooterTable,
              })
            }
            //On click of the button we will send
            //the data as a Json from here to the Second Screen using navigation prop
          />
        </View>

        <Button
          title="Homepage"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
        {/* <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
            <Row
              data={this.state.HeadTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows data={this.state.dataTable} textStyle={styles.TableText} />
            <Row
              data={this.state.FooterTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
          </Table>
        </View> */}
        {/* <Modal
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.text}>Change text:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ inputText: text });
                console.log("state ", this.state.inputText);
              }}
              defaultValue={this.state.inputText}
              editable={true}
              multiline={false}
              maxLength={200}
            />
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              editable={true}
              onChangeText={this.handleInputChange}
              value={this.state.price}
            />
            <TouchableHighlight
              onPress={() => {
                this.handleEditItem(this.state.editedItem);
                this.setModalVisible(false);
              }}
              style={[styles.touchableHighlight, { backgroundColor: "orange" }]}
              underlayColor={"#f1f1f1"}
            >
              <Text style={styles.text}>Save</Text>
            </TouchableHighlight>
          </View>
        </Modal> */}
      </ScrollView>
    );
  }
  _saveValue = async () => {
    try {
      this.setState({ loading: true });
      await firebase
        .database()
        .ref("/total")
        .push({ total: this.state.FooterTable });
    } catch (e) {
      // Error! oh no
      console.log("e :", e);
    } finally {
      this.setState({ loading: false });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 18,
    // paddingTop: 35,
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
  button: {
    width: "100%",
  },
  itemsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  itemtext: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
