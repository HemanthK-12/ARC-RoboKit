<script>
    import { onMount } from "svelte";
    import { auth, db, signInWithPopup, GoogleAuthProvider, signOut, collection, addDoc, deleteDoc, doc, onSnapshot } from "./firebase";
    import { writable } from "svelte/store";
  
    let user = writable(null);
    let todos = writable([]);
  
    const provider = new GoogleAuthProvider();
  
    async function login() {
      try {
        const result = await signInWithPopup(auth, provider);
        user.set(result.user);
      } catch (error) {
        console.error(error);
      }
    }
  
    async function logout() {
      try {
        await signOut(auth);
        user.set(null);
        todos.set([]);
      } catch (error) {
        console.error(error);
      }
    }
  
    async function addTodo() {
      const newTodo = { text: todoText, completed: false, uid: $user.uid };
      try {
        await addDoc(collection(db, "todos"), newTodo);
        todoText = "";
      } catch (error) {
        console.error(error);
      }
    }
  
    async function deleteTodo(id) {
      try {
        await deleteDoc(doc(db, "todos", id));
      } catch (error) {
        console.error(error);
      }
    }
  
    onMount(() => {
      auth.onAuthStateChanged(async (user) => {
        user ? user.set(user) : user.set(null);
      });
  
      const q = query(collection(db, "todos"));
      onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ id: doc.id, ...doc.data() });
        });
        todos.set(todosArray);
      });
    });
  
    let todoText = "";
  </script>
  
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    {#if $user}
      <div class="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">To-Do List</h1>
        <div class="mb-4">
          <input type="text" bind:value={todoText} class="w-full px-3 py-2 border rounded-md" placeholder="New task">
          <button on:click={addTodo} class="mt-2 w-full bg-blue-500 text-white py-2 rounded-md">Add</button>
        </div>
        <ul>
          {#each $todos as todo (todo.id)}
            <li class="flex justify-between items-center py-2">
              <span>{todo.text}</span>
              <button on:click={() => deleteTodo(todo.id)} class="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
            </li>
          {/each}
        </ul>
        <button on:click={logout} class="mt-4 w-full bg-gray-500 text-white py-2 rounded-md">Logout</button>
      </div>
    {:else}
      <button on:click={login} class="bg-blue-500 text-white py-2 px-4 rounded-md">Login with Google</button>
    {/if}
  </div>
  
  <style>
    /* Custom styles if needed */
  </style>
  