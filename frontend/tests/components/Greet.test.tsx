import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Greet from '../../src/components/Greet'
import React from 'react'
import '@testing-library/jest-dom/vitest';

describe('Greet', () => {
    it('should render Hello with the name when name is provided', () => {
        render(<Greet name="Allan" />); //render function renders or Greet component into a virtual DOM that is implemented by JSDOM

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/hello Allan/i);
    });

    it('should render login button when name is not provided', () => {
        render(<Greet />); //render function renders or Greet component into a virtual DOM that is implemented by JSDOM

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/login/i);
    });

})