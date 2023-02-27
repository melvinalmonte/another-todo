import { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <nav class="p-3 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Another To-Do
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
