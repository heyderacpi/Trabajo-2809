import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Stock from "./nuevo"; 

test("Renderiza el componente Stock sin errores", () => {
  render(<Stock />);
  expect(screen.getByText("H.L.A.P SHOP")).toBeInTheDocument();
});

test("Muestra el menú de categorías al hacer clic en el botón", () => {
  render(<Stock />);
  const button = screen.getByText("Categorías");

  fireEvent.click(button);

  const categoryPopup = screen.getByTestId("category-popup");
  expect(categoryPopup).toBeInTheDocument();
});

test("Muestra más productos al hacer clic en el botón 'Ver más'", () => {
  render(<Stock />);
  const seeMoreButton = screen.getByText("Ver más");

  fireEvent.click(seeMoreButton);

  const seeLessButton = screen.getByText("Ver menos");
  expect(seeLessButton).toBeInTheDocument();
});
