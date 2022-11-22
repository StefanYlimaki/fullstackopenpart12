
import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Todo from '../src/Todos/Todo';
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
  
describe("Todo Component", () => {
  const onClickDelete = jest.fn();
  const onClickComplete = jest.fn();

  const todo = {
    text: 'testing is useful',
    done: false
  }

  render(<Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />)
  const text = screen.getByTestId("text")

  test("Todo text", () => {
    expect(text).toHaveTextContent("testing is useful")
  })

})