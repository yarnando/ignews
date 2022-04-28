import { render, screen } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

jest.mock('next-auth/react', () => {
    return {
        useSession() {
            return [null, false]
            // param 1: tem session ou não
            // param 2, tá carregando a session?
        }
    }
})

describe('Header component', () => {

    it('renders correctly', () => {
        render(
            <Header/>
        )

        screen.logTestingPlaygroundURL()
    
        //se quiser dar um console.log do que foi renderizado
        // debug()
    
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Posts')).toBeInTheDocument()
    })

})
