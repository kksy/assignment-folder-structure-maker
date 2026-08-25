import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    render(<NodeList nodes={nodes} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByText('Folder A')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add child to folder a/i })).toBeInTheDocument()
  })

  it('should show folder node when child type is folder', () => {
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


    render(<NodeList nodes={nodes} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByText('Folder B')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add child to folder b/i })).toBeInTheDocument()
  })

  it('should show unset node child type is unset', () => {
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

    render(<NodeList nodes={nodes} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByRole('button', { name: /^file$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^folder$/i })).toBeInTheDocument()
  })

  it('should show file node when child type is file', () => {
    const nodes = [
      {
        id: 'node-1',
        type: 'folder',
        name: 'Folder A',
        children: [
          {
            id: 'node-2',
            type: 'file',
            name: 'File A',
          },
        ],
      },
    ] as Node[]

    render(<NodeList nodes={nodes} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    expect(screen.getByText('File A')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /add child to file a/i })).not.toBeInTheDocument()
  })

  it('should show the naming form inside the unset node when a type is selected', async () => {
    const user = userEvent.setup()
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

    render(<NodeList nodes={nodes} onAddNode={vi.fn()} onDeleteNode={vi.fn()} />)

    const folderButton = screen.getByRole('button', { name: /^folder$/i })

    await user.click(folderButton)

    const form = screen.getByRole('form', { name: /add folder/i })
    expect(form).toBeInTheDocument()
  })
})