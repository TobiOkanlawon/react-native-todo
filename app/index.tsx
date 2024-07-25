import { Text, View, SafeAreaView, StyleSheet, TextInput, Button } from "react-native";
import { useState } from 'react';

// since this is a throwaway application, we are reducing the chance
// of randomness by using a special number. This is not a complete
// solution
const SPECIAL_NUMBER = 1000;

// The problem with this implementation is that the component
// rerenders whenever the input (todo) changes. This is a problem
// because it also rerenders the child components.

// One solution is to make the input its own component and abstract
// the input handling, emitting only the full information back to its
// parent.

// However, this can lead to a deep component tree and eventually
// managerially unwieldly code.

// There should be a better performance optimization.
export default function Index() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    
    const addTodo = () => {
        const newTodo = {
            id: Math.floor(Math.random() * SPECIAL_NUMBER),
            name: todo,
            completed: false,
        };
        setTodos([newTodo, ...todos]);
        setTodo("");
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id != id));
    };
    
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={setTodo}
              value={todo}
            />
            <Button
              onPress={addTodo}
              title="Enter"
              color="#000000"
              accessibilityLabel="Add this todo to the list of todos"
            />
          </View>
          <View style={styles.todosContainer}>
            {todos.map((todo) => <Todo handleDelete={handleDelete} key={todo.id} todo={todo}/>)}
          </View>
	</SafeAreaView>
    );
};

const Todo = ({todo, handleDelete}) => {
    return (
        <View style={styles.todoContainer}>
          <Text>{todo.name}</Text>
          <Button
            onPress={() => handleDelete(todo.id)}
            title="Delete"
            color="#000000"
          />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'gray',
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    textInput: {
        padding: 6,
        height: 40,
        borderWidth: 2,
        width: '80%',
        marginBottom: 8,
        backgroundColor: "white",
        color: "black",
    },
    textInputContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    todoContainer: {
        backgroundColor: "white",
        color: 'black',
        borderBottomWidth: 1,
        marginBottom: 8,
        padding: 12,
    },
    todosContainer: {
        marginTop: 4,
        padding: 12,
        width: "100%",
    }
});
