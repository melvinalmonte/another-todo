import { Component, createSignal, For, Match, Switch } from "solid-js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api";

const Todo: Component = () => {
  const [newTodo, setNewTodo] = createSignal("");

  // CRUD operations
  const createEntry = createTodo();
  const readTodos = getTodos();
  const updateEntry = updateTodo();
  const deleteEntry = deleteTodo();

  const onAdd = () => {
    if (newTodo() !== "") {
      createEntry.mutate(newTodo());
      setNewTodo("");
    }
  };

  return (
    <div class="h-100 w-full flex items-center justify-center">
      <div class="bg-white rounded shadow p-6 m-4 lg:w-3/4 ">
        <div class="mb-4">
          <h1 class="text-gray-800 text-lg font-bold">Todos:</h1>
          <div class="flex mt-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={newTodo()}
              onInput={e => setNewTodo(e.currentTarget.value)}
            />
            <button class="flex-no-shrink p-2 border-2 rounded" onClick={() => onAdd()}>
              Add
            </button>
          </div>
        </div>
        <div>
          <Switch>
            <Match when={readTodos.isLoading} keyed>
              <p>Loading...</p>
            </Match>
            <Match when={readTodos.isError} keyed>
              <p>Error: {readTodos?.error?.message}</p>
            </Match>
            <Match when={readTodos.isSuccess} keyed>
              <For each={readTodos.data}>
                {todo => (
                  <div class="flex mb-4 items-center">
                    <p class={`w-full ${todo.done && " line-through"}`}>{todo.text}</p>
                    <button
                      onClick={() => updateEntry.mutate({ ...todo, done: !todo.done })}
                      class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded"
                    >
                      {todo.done ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteEntry.mutate({ ...todo, done: !todo.done })}
                      class="flex-no-shrink p-2 ml-2 border-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </For>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Todo;
