import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${({ size }) => 
    size === 'small' ? '0.5rem 1rem' :
    size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'
  };
  font-size: ${({ size }) => 
    size === 'small' ? '0.875rem' :
    size === 'large' ? '1.125rem' : '1rem'
  };
  font-weight: 600;
  border: none;
  border-radius: ${({ variant }) => variant === 'rounded' ? '50px' : '8px'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'primary': return 'linear-gradient(to right, #007bff, #0056b3)';
      case 'secondary': return '#6c757d';
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      case 'outline': return 'transparent';
      default: return 'linear-gradient(to right, #007bff, #0056b3)';
    }
  }};
  
  color: ${({ variant }) => variant === 'outline' ? '#007bff' : 'white'};
  border: ${({ variant }) => variant === 'outline' ? '2px solid #007bff' : 'none'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;