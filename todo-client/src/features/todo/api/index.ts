import {
  createMutation,
  CreateMutationResult,
  createQuery,
  CreateQueryResult
} from "@tanstack/solid-query";
import { queryClient } from "../../../utils";
import { Todo } from "./types";
const URL = "http://localhost:4000/";

export const getTodos = (): CreateQueryResult<Todo[], Error> => {
  return createQuery({
    queryKey: () => ["todos"],
    queryFn: async () => {
      const response = await fetch(URL + "todos", { method: "GET" });
      if (!response.ok) {
        throw new Error("Could not fetch todos");
      }
      return response.json();
    }
  });
};

export const deleteTodo = (): CreateMutationResult<Todo, Error, Todo> => {
  return createMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (todo: Todo) => {
      const response = await fetch(URL + "todos/" + todo.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*"
        },
        body: JSON.stringify(todo)
      });
      if (!response.ok) {
        throw new Error("Could not delete todo");
      }
      return { ...todo };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
};
export const updateTodo = (): CreateMutationResult<Todo, Error, Todo> => {
  return createMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (todo: Todo) => {
      console.log("TODO: ", todo);
      const response = await fetch(URL + "todos/" + todo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*"
        },
        body: JSON.stringify(todo)
      });
      if (!response.ok) {
        throw new Error("Could not update todo");
      }
      return await response.json();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
};
export const createTodo = (): CreateMutationResult<string, Error, string> => {
  return createMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (todo: string) => {
      const response = await fetch(URL + "todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*"
        },
        body: JSON.stringify({ text: todo })
      });
      if (!response.ok) {
        throw new Error("Could not update todo");
      }
      return await response.json();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
};
