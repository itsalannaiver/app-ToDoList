import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "./CheckBox";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <CheckBox
          style={styles.Check}
          changeChecked={props.changeChecked}
          checked={props.checked}
        />
        <Text style={styles.itemTex}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: "4%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "4%",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    width: "100%",
  },
  itemLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemTex: {
    // maxWidth: "87%",
    // marginTop: "10%",
    marginLeft: 10,
    flexShrink: 1,
    flex: 1,
    lineHeight: 20
  },
  Check: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Task;
