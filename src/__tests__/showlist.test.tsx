/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import React from "react";
import shows from '../../mocks/shows';
import Card from '../components/Card';

describe('show list', () => {
  //test card info
  test("renders card content", () => {
    shows.forEach(item => {
      const { container } = render(<Card {...item} />)
      const targets = ['.card', '.card-info', '.card-info-bottom'];
      targets.forEach(elem => {
        expect(container.querySelector(elem)).toBeInTheDocument();
      })
      expect(screen.getByText(item.name)).toBeInTheDocument();
    })
  });
})