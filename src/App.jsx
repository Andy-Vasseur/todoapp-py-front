// Components
import Wrapper from "./components/Wrapper"
import Todo from "./components/Todo"

function App() {
  return (
    <div className="App">
      <Wrapper
        title="TodoAPP"
        todoCount={5}
      />
      <Todo />
    </div>
  )
}

export default App
