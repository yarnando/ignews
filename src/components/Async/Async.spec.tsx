import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
    render(<Async />)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
    // expect(await screen.findByText('Button')).toBeInTheDocument() // "findByText" waits for element to show in the screen. Returns a promise
    // expect(await screen.findByText('Button', {}, { timeout: 1000 })).toBeInTheDocument() // "findByText" with timeout

    //queryByText doesnt show error if nothing was found, like getByText does
    // "query" doesnt show error if nothing was found
    // "get" show error if nothing was found
    // "find" waits for the element to appear, but returns an error either if nothing was found

    // await waitFor(() => { // waits for anything to show in the screen, not necessarily a component
    //     return expect(screen.getByText('Button')).toBeInTheDocument()
    // } ,{
    //     timeout: 3000 // optional param
    // })

    await waitForElementToBeRemoved(screen.queryByText('Button'))

})