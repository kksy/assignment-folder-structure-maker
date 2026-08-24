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

  function handleAddNode(parentId: string, node: Node) {
    function updateNodeTree(currentNodes: Node[], targetParentId: string, nodeToAdd: Node): Node[] {
      return currentNodes.map((currentNode) => {
        if (currentNode.id === targetParentId) {
          const children = currentNode.children ?? []
          const hasExistingChild = children.some((child) => child.id === nodeToAdd.id)

          return {
            ...currentNode,
            children: hasExistingChild
              ? children.map((child) => (child.id === nodeToAdd.id ? nodeToAdd : child))
              : [...children, nodeToAdd],
          }
        }

        if (currentNode.children) {
          return {
            ...currentNode,
            children: updateNodeTree(currentNode.children, targetParentId, nodeToAdd),
          }
        }

        return currentNode
      })
    }

    setNodes((currentNodes) => updateNodeTree(currentNodes, parentId, node))
  }

  return (
    <main>
      <h1 className="heading">Folder Structure Maker</h1>
      <div className="container">
        <button className="button button--primary" onClick={handleAddFolderToRootClick}>Add folder to root</button>
        {showForm && (
          <AddNodeForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
        )}
        <NodeList nodes={nodes} onAddNode={handleAddNode} />
      </div>
    </main>
  )
}

export default App
