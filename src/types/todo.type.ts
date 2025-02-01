/* eslint-disable */
export interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

export interface TodoState {
  value: Todo[];
}

export interface TodoItemProps {
  todo: Todo;
  index: number;
  onDrop: (index: number) => void;
  setActiveCard: (id: string | null) => void;
  activeCard: string | null;
}

export interface TodoStatusProps {
  isSelected: (status: string) => string;
  setShow: (status: string) => void;
}
