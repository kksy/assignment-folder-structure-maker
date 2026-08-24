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
      const newNode: Node = {
        id: crypto.randomUUID(),
        type: 'folder',
        name: inputValue.toString(),
      }

      setNodes((currentNodes) => [...currentNodes, newNode])
      setShowForm(false)
    }
  }

  return (
    <main>
      <h1 className="heading">Folder Structure Maker</h1>
      <div className="container">
        <button className="button button--primary" onClick={handleAddFolderToRootClick}>Add folder to root</button>
        {showForm && (<form className="node-form" aria-label="Add folder" onSubmit={handleFormSubmit} className="node-form">
          <label className="form__label">
            <img className="form__icon" src={FolderOpenRegularIcon} alt="" />
            <span className="visually-hidden">Folder name</span>
            <input aria-label="Folder name" name="name" />
          </label>
          <button className="button button--primary button--sm" type="submit" aria-label="confirm">✓</button>
          <button className="button button--secondary button--sm" aria-label="cancel" type="button">×</button>
        </form>)}
        <ul>
          {nodes.map((node) => {
            return (
              <li id={node.id}>{node.name}</li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}

export default App
