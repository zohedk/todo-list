import React, { createContext, useState } from "react";

interface TaskFromContextProps {
  taskForm: HTMLDivElement | null;
  setTaskForm: any;
  taskCard: HTMLDivElement | null;
  setTaskCard: any;
}

const TaskFromContext = createContext<TaskFromContextProps | null>(null);

const TaskFromProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [taskForm, setTaskForm] = useState<HTMLDivElement | null>(null);
  const [taskCard, setTaskCard] = useState<HTMLDivElement | null>(null);
  return (
    <TaskFromContext.Provider
      value={{
        taskForm,
        setTaskForm,
        taskCard,
        setTaskCard,
      }}
    >
      {children}
    </TaskFromContext.Provider>
  );
};

export { TaskFromProvider, TaskFromContext };
