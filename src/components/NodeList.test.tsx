import { render, screen } from '@testing-library/react'
import NodeList from './NodeList'
import type { Node } from '../types/node'

describe('NodeList', () => {
  it('should show folder node when type is folder', () => {
    const nodes = [
      {
        id: 'node-1',
        type: 'folder',
        name: 'Folder A',
      },
    ] as Node[]

    render(<NodeList nodes={nodes} onAddNode={vi.fn()} />)

    expect(screen.getByText('Folder A')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add child to folder a/i })).toBeInTheDocument()
  })

  it('should show children nodes', () => {
    const nodes = [
      {
        id: 'node-1',
        type: 'folder',
        name: 'Folder A',
        children: [
          {
            id: 'node-2',
            type: 'folder',
            name: 'Folder B',
          }
        ]
      },
    ] as Node[]


    render(<NodeList nodes={nodes} onAddNode={vi.fn()} />)

    expect(screen.getByText('Folder B')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add child to folder b/i })).toBeInTheDocument()
  })

  it('should show unset node when type is unset at the second level', () => {
    const nodes = [
      {
        id: 'node-1',
        type: 'folder',
        name: 'Folder A',
        children: [
          {
            id: 'node-2',
            type: 'unset',
          },
        ],
      },
    ] as Node[]

    render(<NodeList nodes={nodes} onAddNode={vi.fn()} />)

    expect(screen.getByRole('button', { name: /^file$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^folder$/i })).toBeInTheDocument()
  })
})