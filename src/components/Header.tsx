
import { type ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

type HeaderProps ={
    image:{
        src:string;
        alt:string;
        width?: string;
        height?: string;
    }
   children: ReactNode;
}
const Header = ({image,children}:HeaderProps) => {
    return (<>
        <Navbar  bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">{children}</Navbar.Brand>
                   {/* <Image src ={image.src} alt={image.alt} className="header-image" /> */}
                <Image {...image} className="header-image" />
            </Container>
        </Navbar>
    </>);

}


export default Header;