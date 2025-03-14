import styled from 'styled-components';

// Define the types for the props that the Wrapper component expects
interface WrapperProps {
  color: string; // The color used for text and border
  bcg: string;   // The background color for the icon container
}

// Typing the styled component correctly so TypeScript understands it as a JSX element
const Wrapper = styled.article<WrapperProps>`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }

  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }

  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

export default Wrapper;
