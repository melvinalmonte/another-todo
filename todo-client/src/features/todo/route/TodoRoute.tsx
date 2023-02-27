import { Component } from "solid-js";
import Layout from "../../../components/layout";
import Todo from "../components/Todo";

const TodoRoute: Component = () => {
  return (
    <Layout>
      <Todo />
    </Layout>
  );
};

export default TodoRoute;
