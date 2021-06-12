import * as FileSystem from "expo-file-system";

const fileDirectory = FileSystem.documentDirectory;

const CreateDirectory = async () => {
  const x = (await FileSystem.getInfoAsync(fileDirectory + "tasks")).exists;

  if (!x) {
    await FileSystem.makeDirectoryAsync(fileDirectory + "tasks");
  }
};

export const writeToDirectory = async (data) => {
  const pushToJson = JSON.stringify({ data });
  await CreateDirectory();

  await FileSystem.writeAsStringAsync(
    fileDirectory + "tasks/ToDoList",
    pushToJson,
    {
      encoding: FileSystem.EncodingType.UTF8,
    }
  );
};

export const readFromDirectory = async () => {
  let exists = (await FileSystem.getInfoAsync(fileDirectory + "tasks/ToDoList")).exists;
  if (exists) {
    let readTasks = await FileSystem.readAsStringAsync(
      fileDirectory + "tasks/ToDoList",
      { encoding: FileSystem.EncodingType.UTF8 }
    );

    let data = JSON.parse(readTasks);
    return data.data;
  } else {
    return [];
  }
};
