import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'

jest.mock('next/router')
jest.mock('next-auth/react', () => {
    return {
        useSession: () => ({data: null, status: "unauthenticated"})
    }
})
jest.mock('../../services/stripe')

describe('Home page', () => {

    it('renders correctly', () => {

        render(<Home
            product={{ priceId: 'fake-price-id', amount: 'R$10,00' }}
        />)

        expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
        //exp. regular
    })

    it('loads initial data', async () => {
        const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

        retrieveStripePricesMocked.mockResolvedValueOnce({
            id: 'fake-price-id',
            unit_amount: 1000,
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual( // se fosse só isso, verificaria se é estritamente igual
            expect.objectContaining({ // como tem isso, verifica se tem pelo menos essas informações
                props: {
                    product: {
                        priceId: 'fake-price-id',
                        amount: '$10.00'
                    }
                }
            })
        )

    })
})