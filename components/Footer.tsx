import Container from './Container';

const Footer = () => {
    return (
        <footer className="mt-6 mb-8">
            <Container className="flex gap-4">
                <p className="text-sm">
                    Invoicipeid &copy; {new Date().getFullYear()}
                </p>
                <p className="text-sm">
                    Created by x with Next.js, Tailwind, Clerk, Prisma, and Shadcn
                </p>
            </Container>
        </footer>
    )
}

export default Footer;
