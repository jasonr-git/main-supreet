import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 3rem 0 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #007bff;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  p, li {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: #ccc;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  svg {
    color: #007bff;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #444;
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  color: #999;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Supreet Souharda Co-op Society</h3>
          <p>
            Your trusted financial partner in Kelginoor, Honnavar. 
            We are committed to empowering our community through 
            comprehensive banking and financial services.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/aboutus">About Us</FooterLink></li>
            <li><FooterLink to="/deposit">Deposit Services</FooterLink></li>
            <li><FooterLink to="/loan">Loan Services</FooterLink></li>
            <li><FooterLink to="/gallery">Gallery</FooterLink></li>
            <li><FooterLink to="/contact">Contact Us</FooterLink></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <ul>
            <li>Savings Accounts</li>
            <li>Fixed Deposits</li>
            <li>Recurring Deposits</li>
            <li>Personal Loans</li>
            <li>Home Loans</li>
            <li>Business Loans</li>
            <li>Insurance Services</li>
            <li>Digital Banking</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ContactItem>
            <FaMapMarkerAlt />
            <span>Kelginoor, Honnavar, Karnataka</span>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <span>+91 XXXXX XXXXX</span>
          </ContactItem>
          <ContactItem>
            <FaEnvelope />
            <span>info@supreetsouharda.com</span>
          </ContactItem>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © {currentYear} Supreet Souharda Co-operative Society. All rights reserved. 
          Built with ❤️ for our community.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;