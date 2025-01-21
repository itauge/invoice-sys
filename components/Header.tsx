import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import Container from './Container';

const Header = () => {
    return (
        <header>
            <Container>
                <div className="flex justify-between items-center gap-4">
                    <SignedOut> 
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </Container>
        </header>
    )
}

export default Header;