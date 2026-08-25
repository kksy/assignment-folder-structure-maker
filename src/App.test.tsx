import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App', () => {
  it('should not show form at the start', async () => {
    render(<App />)

    expect(screen.queryByRole('form', { name: /add folder/i })).not.toBeInTheDocument()
  })

  it('should create a folder with name when confirm button is clicked and close the form', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /add folder to root/i }))

    expect(screen.getByRole('form', { name: /add folder/i })).toBeInTheDocument()

    const expectedFolderName = 'new folder'
    const input = screen.getByRole('textbox', { name: /name/i })

    await user.click(input)
    await user.keyboard(expectedFolderName)
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    expect(screen.getByText(expectedFolderName)).toBeInTheDocument()
    expect(screen.queryByRole('form', { name: /add folder/i })).not.toBeInTheDocument()
  })

  it('should not create a folder when button is clicked and no name is set', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /add folder to root/i }))

    expect(screen.getByRole('form', { name: /add folder/i })).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: /name/i })

    await user.click(input)
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    expect(screen.queryByRole('form', { name: /add folder/i })).not.toBeInTheDocument()
  })

  it('should create a folder node when the unset child is resolved as folder', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add folder to root/i }))
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Project')
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    const projectItem = screen.getByText(/project/i).closest('li')
    expect(projectItem).not.toBeNull()

    await user.hover(projectItem!)
    await user.click(screen.getByRole('button', { name: /add child to project/i }))
    await user.click(screen.getByRole('button', { name: /^folder$/i }))
    expect(screen.getByRole('form', { name: /add folder/i })).toBeInTheDocument()
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Documents')
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  it('should create a file node when the unset child is resolved as file', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add folder to root/i }))
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Project')
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    const projectItem = screen.getByText(/project/i).closest('li')
    expect(projectItem).not.toBeNull()

    await user.hover(projectItem!)
    await user.click(screen.getByRole('button', { name: /add child to project/i }))
    await user.click(screen.getByRole('button', { name: /^file$/i }))
    expect(screen.getByRole('form', { name: /add file/i })).toBeInTheDocument()
    await user.type(screen.getByRole('textbox', { name: /file name/i }), 'README')
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    expect(screen.getByText('README')).toBeInTheDocument()
  })

  it('should delete a folder and its children', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add folder to root/i }))
    await user.type(screen.getByRole('textbox', { name: /folder name/i }), 'Project')
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    const projectItem = screen.getByText('Project').closest('li')
    expect(projectItem).not.toBeNull()

    await user.click(screen.getByRole('button', { name: /add child to project/i }))
    await user.click(screen.getByRole('button', { name: /^folder$/i }))
    await user.type(screen.getByRole('textbox', { name: /folder name/i }), 'Documents')
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    await user.click(screen.getByRole('button', { name: /delete project/i }))

    expect(screen.queryByText('Project')).not.toBeInTheDocument()
    expect(screen.queryByText('Documents')).not.toBeInTheDocument()
  })
})
