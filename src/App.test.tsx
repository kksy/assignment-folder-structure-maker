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
  })
})
