import { useState, type SubmitEvent } from 'react';
import FolderOpenRegularIcon from './icons/folder-open-regular.svg';
import './App.css';

type Node = {
  type: 'folder' | 'file' | 'unset';
  name?: string;
  children?: Node[];
  id: string;
}

function App() {
  const [showForm, setShowForm] = useState(false)
  const [nodes, setNodes] = useState<Node[]>([])
  
  function handleAddFolderToRootClick() {
    setShowForm(true)
  }

  function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.target);
    const inputValue = formData.get('name')
    if(inputValue) {
      setNodes([...nodes, {
      id: crypto.randomUUID(),
      type: 'folder',
      name: inputValue.toString(),
    }])
    }
    
  }

  return (
    <main>
      <h1 className="Heading">Folder Structure Maker</h1>
      <button onClick={handleAddFolderToRootClick}>Add folder to root</button>
      {showForm && (<form aria-label="Add folder" onSubmit={handleFormSubmit} className="node-form">
        <label className="input-with-icon">
          <img className="Form__icon" src={FolderOpenRegularIcon} alt="" />
          <span className="visually-hidden">Folder name</span>
          <input aria-label="Folder name" name="name" />
        </label>
        <button type="submit" aria-label="confirm">✓</button>
        <button aria-label="cancel" type="button">x</button>
      </form>)}
      <ul>
        {nodes.map((node) => {
          return (
            <li id={node.id}>{node.name}</li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
