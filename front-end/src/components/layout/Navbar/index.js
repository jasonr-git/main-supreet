import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../../constants/routes';
import logo from '../../../images/image-2.png';
import Button from '../../ui/Button';
import useScroll from '../../../hooks/useScroll';

const NavContainer = styled.nav`
  position: relative;
  background: linear-gradient(45deg, rgba(255, 0, 0, 0.3), rgba(0, 0, 255, 0.3));
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  transition: all 0.3s ease;
  
  ${({ scrolled }) => scrolled && `
    background: linear-gradient(45deg, rgba(255, 0, 0, 0.5), rgba(0, 0, 255, 0.5));
    backdrop-filter: blur(20px);
  `}
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  gap: 0.5rem;
  
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  min-width: 150px;
  z-index: 1000;
  
  ${NavLink} {
    display: block;
    padding: 0.5rem 1rem;
    color: #333;
    
    &:hover {
      background: #f8f9fa;
      color: #007bff;
    }
  }
`;

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { scrolled } = useScroll(100);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <NavContainer scrolled={scrolled}>
      <NavWrapper>
        <Logo to="/">
          <img src={logo} alt="Supreet Souharda Logo" />
          SUPREET SOUHARDA
        </Logo>

        <NavItems>
          {NAV_ITEMS.map((item, index) => (
            item.submenu ? (
              <DropdownContainer key={index} ref={dropdownRef}>
                <DropdownButton onClick={() => toggleDropdown(index)}>
                  {item.label}
                </DropdownButton>
                {activeDropdown === index && (
                  <DropdownMenu>
                    {item.submenu.map((subItem, subIndex) => (
                      <NavLink 
                        key={subIndex} 
                        to={subItem.path}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </DropdownMenu>
                )}
              </DropdownContainer>
            ) : (
              <NavLink key={index} to={item.path}>
                {item.label}
              </NavLink>
            )
          ))}
        </NavItems>

        <Button variant="outline" size="small">
          <NavLink to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
            CONTACT US
          </NavLink>
        </Button>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;