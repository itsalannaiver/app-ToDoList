import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, LayoutAnimation, } from "react-native";
import Task from "./components/Task";
import { Ionicons } from "@expo/vector-icons";
import { writeToDirectory, readFromDirectory } from "./components/StoreData";
readFromDirectory();

export default function App() {
  const [task, setTask] = useState({ task: "" });
  const [taskItems, setTaskItems] = useState([]);

  { /* Read from directory */ }
  useEffect(() => {
    (async () => {
      const x = await readFromDirectory();
      setTaskItems(x);
    })();
  }, []);

  { /* Adding a task */ }
  const handleAddTask = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Keyboard.dismiss();
    if (task.task !== "") {
      setTaskItems((s) => {
        const stuff = [...s, task];
        writeToDirectory(stuff);
        return stuff;
      });
      setTask({ task: "" });
    }
  };

  { /* Delete a task */ }
  const handledeletedTask = (index) => {

    setTaskItems((s) => {
      let itemsCopy = [...s];
      itemsCopy.splice(index, 1);
      writeToDirectory(itemsCopy);
      return itemsCopy;
    });

  };

  {/* Clear all tasks */ }
  const handleClearAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setTaskItems([]);
    writeToDirectory([]);
  };

  {/* Handle every task's check */ }
  const handleCheck = (index, value) => {
    setTaskItems((s) => {
      s[index].checked = value;
      writeToDirectory(s);
      return s;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.ClearAll} onPress={handleClearAll}>
            clear all
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.items}>
          {taskItems.map((items, index) => {
            return (
              <View key={index} style={styles.TaskContainer}>
                <Task
                  text={items.task}
                  checked={items.checked}
                  changeChecked={(val) => {
                    handleCheck(index, val);
                  }}
                />
                <Ionicons
                  onPress={() => handledeletedTask(index)}
                  name="trash-outline"
                  size={20}
                  color="#787878"
                  style={styles.deleteTask}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 10, android: 100 })}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task."}
          value={task.task}
          onChangeText={(text) => setTask({ task: text, checked: false })}
          maxLength={50}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEAED",
  },
  tasksWrapper: {
    maxHeight: 1000,
    paddingTop: "15%",
    paddingHorizontal: 20,
    overflow: "scroll",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: "10%",
    borderColor: "#dbdbdb",
    height: "77%",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 285,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    width: "85%",
  },
  addWrapper: {
    width: 45,
    height: 45,
    backgroundColor: "#DD034E",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#dbdbdb",
    opacity: 0.9,
    borderWidth: 1,
  },
  addText: {
    color: "#fff",
    fontSize: 20,
  },
  TaskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteTask: {
    position: "absolute",
    top: "25%",
    right: "4%",
  },
  ClearAll: {
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ClearAll: {
    alignSelf: "center",
    marginTop: "2%",
    marginRight: "2%",
    color: "#6b6b6b",
    fontSize: 15,
  },
});
