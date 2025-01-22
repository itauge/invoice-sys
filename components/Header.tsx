import {
    SignedIn,
    UserButton
  } from '@clerk/nextjs'
import Container from './Container';
import Link from 'next/link';

const Header = () => {
    
    return (
        <header>
            <Container>
            <div className="flex justify-between items-center w-full h-10">
                    <SignedIn>
                        <Link 
                            href="/dashboard" 
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Dashboard
                        </Link>
                        <UserButton />
                    </SignedIn>
                </div>
            </Container>
        </header>
    )
}

export default Header;