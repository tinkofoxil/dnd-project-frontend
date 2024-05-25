import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid className="footer-wrapper py-5">
        <p className="footer-text text-center">
          © 2023, All rights reserved. Made with ❤️ by TinkoFoxil
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
