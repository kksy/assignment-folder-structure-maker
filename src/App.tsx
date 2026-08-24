import { useState } from 'react';
import './App.css';
import AddNodeForm from './components/AddNodeForm';
import NodeList from './components/NodeList';
import type { Node } from './types/node';

function App() {
  const [showForm, setShowForm] = useState(false)
  const [nodes, setNodes] = useState<Node[]>([])
  
  function handleAddFolderToRootClick() {
    setShowForm(true)
  }

  function handleFormSubmit(name: string) {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type: 'folder',
      name,
    }

    setNodes((currentNodes) => [...currentNodes, newNode])
    setShowForm(false)
  }

  return (
    <main>
      <h1 className="heading">Folder Structure Maker</h1>
      <div className="container">
        <button className="button button--primary" onClick={handleAddFolderToRootClick}>Add folder to root</button>
        {showForm && (
          <AddNodeForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
        )}
        <NodeList nodes={nodes} />
      </div>
    </main>
  )
}

export default App
