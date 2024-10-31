import { render, screen } from '@testing-library/react';
import Greeting from './greeting'; // adjust the path if necessary
import '@testing-library/jest-dom'; 
// import Greeting from "./greeting";

test('renders the greeting message for Ankit', () => {
    render(<Greeting name="Ankit" />);
    const greetingElement = screen.getByText((content, element) =>
      /hello, ankit/i.test(element.textContent)
    );
    expect(greetingElement).toBeInTheDocument();
  });
  