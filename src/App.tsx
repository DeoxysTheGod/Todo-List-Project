import React from 'react';
import logo from './logo.svg';
import './App.css';

type State = {
  items: { id: number; text: string; done: boolean }[];
  nextId: number;
  searchText: string;
};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [
        { id: 0, text: "Learn JavaScript", done: false },
        { id: 1, text: "Learn React", done: false },
        { id: 2, text: "Play around in JSFiddle", done: false },
        { id: 3, text: "Build something awesome", done: false }
      ],
      nextId: 4,
      searchText: ''
    };

    this.nbTaskToDo = this.nbTaskToDo.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reorderTasks = this.reorderTasks.bind(this);
    this.search = this.search.bind(this);
  }

  nbTaskToDo() {
    const cpt = this.state.items.filter((item: { done: any; }) => !item.done);
    return cpt.length;
  }



  deleteTask(idTask: number) {
    if (window.confirm()) {
      const updatedItems = this.state.items.filter(item => item.id !== idTask);
      this.setState({ items: updatedItems });
    }
  }

  addTask(event: any) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
    const textTask = event.target.elements.task.value.trim();
    if (!textTask) return; // Si la tâche est vide, ne rien faire
    const newId = this.state.nextId;
    const newTask = { id: newId, text: textTask, done: false };
    this.setState(prevState => ({
      items: [newTask, ...prevState.items],
      nextId: prevState.nextId + 1 // Incrémenter le compteur pour le prochain identifiant
    }));
    event.target.reset(); // Réinitialiser le formulaire après l'ajout de la tâche
  }

  handleChange(id: number) {
    this.setState(prevState => ({
      items: prevState.items.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  }

  reorderTasks(id: number, direction: any) {
    const { items } = this.state;
    const index = items.findIndex(item => item.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= items.length) {
      return; // Ne rien faire si on dépasse les limites du tableau
    }

    const updatedItems = [...items];
    const movedItem = updatedItems.splice(index, 1)[0];
    updatedItems.splice(newIndex, 0, movedItem);

    this.setState({ items: updatedItems });
  }

  search(event: any) {
    this.setState({ searchText: event.target.value });
  }

  render() {

    // @ts-ignore
    return(
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <div className="TodoList">

      </div>
    </div>
    );
  }
}

export default App;
