import { render, screen } from '@testing-library/react'
import { SetNode } from './SetNode'
import type { Node } from '../types/node'

describe('SetNode', () => {
  it('should have a delete button when node is a folder', () => {
    const node: Node = {
      id: 'folder-1',
      type: 'folder',
      name: 'Folder A',
    }

    render(<SetNode node={node} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByRole('button', { name: /delete folder a/i })).toBeInTheDocument()
  })

  it('should show the folder icon when node is a folder', () => {
    const node: Node = {
      id: 'folder-1',
      type: 'folder',
      name: 'Folder A',
    }

    render(<SetNode node={node} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByRole('presentation').getAttribute('src')).toContain('folder-open')
  })

  it('should have a delete button when node is a file', () => {
    const node: Node = {
      id: 'file-1',
      type: 'file',
      name: 'File A',
    }

    render(<SetNode node={node} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByRole('button', { name: /delete file a/i })).toBeInTheDocument()
  })

  it('should show the file icon when node is a file', () => {
    const node: Node = {
      id: 'file-1',
      type: 'file',
      name: 'File A',
    }

    render(<SetNode node={node} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByRole('presentation').getAttribute('src')).toContain('file')
  })

  it('should not have an add button when node is a file', () => {
    const node: Node = {
      id: 'file-1',
      type: 'file',
      name: 'File A',
    }

    render(<SetNode node={node} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.queryByRole('button', { name: /add child to file a/i })).not.toBeInTheDocument()
  })
})
