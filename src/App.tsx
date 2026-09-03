import { useState } from 'react';
import './App.css';
import NodeList from './components/NodeList';
import { addNode, deleteNode, updateNode } from './nodeTree';
import type { Node } from './types/node';

function App() {
  const [nodes, setNodes] = useState<Node[]>([])
  
  function handleAddFolderToRootClick() {
    handleAddNode(undefined)
  }

  function handleAddNode(parentId: string | undefined) {
    const node: Node = {
      id: crypto.randomUUID(),
      type: 'unset',
    }

    setNodes((currentNodes) => addNode(currentNodes, parentId, node))
  }

  function handleUpdateNode(nodeId: string, updates: Pick<Node, 'type' | 'name'>) {
    setNodes((currentNodes) => updateNode(currentNodes, nodeId, updates))
  }

  function handleDeleteNode(nodeId: string) {
    setNodes((currentNodes) => deleteNode(currentNodes, nodeId))
  }

  return (
    <main>
      <h1 className="heading">Folder Structure Maker</h1>
      <div className="container">
        <button className="button button--primary" onClick={handleAddFolderToRootClick}>Add folder to root</button>
        <NodeList
          nodes={nodes}
          onAddNode={handleAddNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
        />
        <div>{JSON.stringify(nodes)}</div>
      </div>
      
    </main>
  )
}

export default App
