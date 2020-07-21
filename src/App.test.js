import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import 'jest-dom/extend-expect';

let renderApp = () => render(<App />);

const NUM_STAGES = 4;

const testIds = {
  createTaskInput: "new-task-name-input",
  createTaskButton: "create-task-btn",
  selectedTaskField: "selected-task-field",
  moveBackBtn: "move-back-btn",
  moveForwardBtn: "move-forward-btn",
  deleteBtn: "delete-btn",
  stages: ["stage-0", "stage-1", "stage-2", "stage-3"],
};

const stageNames = ["Backlog", "To Do", "Ongoing", "Done"];

const taskNameToId = name => {
  return `task-${name.split(' ').join('-')}`;
}

const predefinedTasks = {
  0: [
    "task 0",
    "task 1",
    "task 2",
    "task 3",
  ],
  1: [
    "task 4",
    "task 5",
    "task 6",
  ],
  2: [
    "task 7",
    "task 8",
  ],
  3: [
    "task 9",
  ],
};

beforeEach(() => {
  renderApp = () => render(<App />);
});

afterEach(() => {
  cleanup();
});

test('Clicking on any card should display the name in textbox', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 1'));
  fireEvent.click(task);

  expect(selectedTaskField).toHaveValue('task 1');
});

test('Once the card selected based on the current stage able move forward and backward', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);
  const firstStage = getByTestId(testIds.stages[1]);
  const secondStage = getByTestId(testIds.stages[2]);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 4'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 4');

  expect(moveBackBtn).toBeEnabled();
  expect(moveForwardBtn).toBeEnabled();

  fireEvent.click(moveForwardBtn);

  expect(firstStage).not.toContainElement(queryByTestId(taskNameToId('task 4')));
  expect(secondStage).toContainElement(queryByTestId(taskNameToId('task 4')));


  fireEvent.click(moveBackBtn);

  expect(firstStage).toContainElement(queryByTestId(taskNameToId('task 4')));
  expect(secondStage).not.toContainElement(queryByTestId(taskNameToId('task 4')));

});

test('If the card/task selected from the 1st stage should disable the "Move backward" button.', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 0'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 0');

  expect(moveBackBtn).toBeDisabled();
  expect(moveForwardBtn).toBeEnabled();
});

test('If the card/task selected from the last stage should disable the "Move forward" button.', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 9'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 9');

  expect(moveForwardBtn).toBeDisabled();
  expect(moveBackBtn).toBeEnabled();
});

test('After selecting task from 2nd stage and clicking on Move forward button move the card to 3rd stage.', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const firstStage = getByTestId(testIds.stages[1]);
  const lastStage = getByTestId(testIds.stages[2]);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 5'));
  fireEvent.click(task);

  expect(selectedTaskField).toHaveValue('task 5');
  expect(moveForwardBtn).toBeEnabled();

  fireEvent.click(moveForwardBtn);

  expect(firstStage).not.toContainElement(queryByTestId(taskNameToId('task 5')));
  expect(lastStage).toContainElement(queryByTestId(taskNameToId('task 5')));
});

test('After selecting task from 2nd stage and clicking on Move backward button move the card to 1st stage.', () => {

  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);
  const firstStage = getByTestId(testIds.stages[1]);
  const lastStage = getByTestId(testIds.stages[0]);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 5'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 5');
  expect(moveBackBtn).toBeEnabled();

  fireEvent.click(moveBackBtn);

  expect(moveBackBtn).toBeDisabled();
  expect(firstStage).not.toContainElement(queryByTestId(taskNameToId('task 5')));
  expect(lastStage).toContainElement(queryByTestId(taskNameToId('task 5')));
});

test('Once the card selected and clicking on  Delete button should remove the card from board.', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const deleteBtn = getByTestId(testIds.deleteBtn);
  const firstStage = getByTestId(testIds.stages[0]);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 0'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 0');
  expect(deleteBtn).toBeEnabled();

  fireEvent.click(deleteBtn);

  expect(firstStage).not.toContainElement(queryByTestId(taskNameToId('task 0')));
  expect(selectedTaskField).toHaveValue('');
  expect(selectedTaskField.placeholder).toEqual('Selected task name');
});

test('Clicking on "Add card" button should add one card in first stage and able move forward and backward. ', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const createTaskInput = getByTestId(testIds.createTaskInput);
  const createTaskButton = getByTestId(testIds.createTaskButton);

  const firstStage = getByTestId(testIds.stages[0]);
  const secondStage = getByTestId(testIds.stages[1]);

  const taskName = 'new task';
  const taskId = taskNameToId(taskName);

  fireEvent.change(createTaskInput, {
    target: { value: taskName }
  });

  expect(firstStage).not.toContainElement(queryByTestId(taskId));
  expect(secondStage).not.toContainElement(queryByTestId(taskId));

  fireEvent.click(createTaskButton);

  const task = getByTestId(taskId);
  fireEvent.click(task);

  expect(firstStage).toContainElement(queryByTestId(taskId));
  expect(secondStage).not.toContainElement(queryByTestId(taskId));


  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);

  fireEvent.click(moveForwardBtn);
  expect(firstStage).not.toContainElement(queryByTestId(taskId));
  expect(secondStage).toContainElement(queryByTestId(taskId));

  fireEvent.click(moveBackBtn);
  expect(firstStage).toContainElement(queryByTestId(taskId));
  expect(secondStage).not.toContainElement(queryByTestId(taskId));
});

test('Clicking on "Add card" button without any input should not affect anything', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();
  const createTaskButton = getByTestId(testIds.createTaskButton);
  expect(createTaskButton).toBeDisabled();
});

test('Move forward an item till the last state and should disable the move forward button', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);
  const firstStage = getByTestId(testIds.stages[0]);
  const lastStage = getByTestId(testIds.stages[3]);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 0'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 0');

  expect(moveBackBtn).toBeDisabled();
  expect(moveForwardBtn).toBeEnabled();

  fireEvent.click(moveForwardBtn);
  fireEvent.click(moveForwardBtn);
  fireEvent.click(moveForwardBtn);

  expect(moveForwardBtn).toBeDisabled();
  expect(firstStage).not.toContainElement(queryByTestId(taskNameToId('task 0')));
  expect(lastStage).toContainElement(queryByTestId(taskNameToId('task 0')));
});

test('Move backward an item till the first state and should disable the move backward button', () => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  const selectedTaskField = getByTestId(testIds.selectedTaskField);
  const moveForwardBtn = getByTestId(testIds.moveForwardBtn);
  const moveBackBtn = getByTestId(testIds.moveBackBtn);
  const firstStage = getByTestId(testIds.stages[3]);
  const lastStage = getByTestId(testIds.stages[0]);

  expect(selectedTaskField).toBeVisible();
  expect(selectedTaskField).toHaveValue('');

  const task = getByTestId(taskNameToId('task 9'));
  fireEvent.click(task);
  expect(selectedTaskField).toHaveValue('task 9');

  expect(moveBackBtn).toBeEnabled();
  expect(moveForwardBtn).toBeDisabled();

  fireEvent.click(moveBackBtn);
  fireEvent.click(moveBackBtn);
  fireEvent.click(moveBackBtn);

  expect(moveBackBtn).toBeDisabled();
  expect(firstStage).not.toContainElement(queryByTestId(taskNameToId('task 9')));
  expect(lastStage).toContainElement(queryByTestId(taskNameToId('task 9')));
});

