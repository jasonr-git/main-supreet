import styled from 'styled-components';

const StyledCard = styled.div`
  background: ${({ theme }) => theme.card || 'white'};
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 0.1px solid transparent;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: rgba(23, 92, 230, 0.25) 0px 8px 32px;
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 1rem;
  padding-top: 1rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || '#333'};
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text_secondary || '#666'};
  line-height: 1.5;
`;

const Card = ({ 
  children, 
  image, 
  title, 
  description, 
  footer,
  className,
  ...props 
}) => {
  return (
    <StyledCard className={className} {...props}>
      {image && <CardImage src={image} alt={title} />}
      
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      {children && <CardBody>{children}</CardBody>}
      
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription };
export default Card;