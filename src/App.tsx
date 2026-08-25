import { useState } from 'react';
import './App.css';
import NodeList from './components/NodeList';
import type { Node } from './types/node';

function App() {
  const [nodes, setNodes] = useState<Node[]>([])
  
  function handleAddFolderToRootClick() {
    handleAddNode(undefined, {
      id: crypto.randomUUID(),
      type: 'unset',
    })
  }

  function handleAddNode(parentId: string | undefined, node: Node) {
    if (!parentId) {
      setNodes((currentNodes) => {
        const hasExistingNode = currentNodes.some((currentNode) => currentNode.id === node.id)

        return hasExistingNode
          ? currentNodes.map((currentNode) => (currentNode.id === node.id ? node : currentNode))
          : [...currentNodes, node]
      })
      return
    }

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

  function handleDeleteNode(nodeId: string) {
    function removeNode(currentNodes: Node[]): Node[] {
      return currentNodes
        .filter((node) => node.id !== nodeId)
        .map((node) => node.children
          ? { ...node, children: removeNode(node.children) }
          : node)
    }

    setNodes((currentNodes) => removeNode(currentNodes))
  }

  return (
    <main>
      <h1 className="heading">Folder Structure Maker</h1>
      <div className="container">
        <button className="button button--primary" onClick={handleAddFolderToRootClick}>Add folder to root</button>
        <NodeList
          nodes={nodes}
          onAddNode={handleAddNode}
          onDeleteNode={handleDeleteNode}
        />
      </div>
      <pre>{JSON.stringify(nodes)}</pre>
    </main>
  )
}

export default App
