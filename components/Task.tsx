import { priorityTraduction } from "../helpers";
import { HandleModal, Task as ITask } from "../types/task";

interface Props {
  task: ITask;
  handleShowModal: (value: HandleModal) => void;
  setTask: React.Dispatch<React.SetStateAction<ITask>>
}

export default function Task({ task, handleShowModal, setTask }: Props) {
  const applyStylesPriority = (priority: "HIGH" | "MEDIUM" | "LOW") => {
    if (priority === "HIGH") {
      return "text-red-600";
    } else if (priority === "MEDIUM") {
      return "text-amber-400";
    } else {
      return "text-lime-500";
    }
  };

  const handleShowModalDelete = () => {
    setTask(task);
    handleShowModal({ operation: "delete", value: true });
  };

  const handleShowModalEdit = () => {    
    handleShowModal({ operation: "edit", value: true });
  };

  return (
    <div className="rounded-md w-full bg-white mb-2 px-4 pt-2">
      <p className="text-gray-800 font-bold uppercase text-center">
        Prioridad:{" "}
        <span className={`${applyStylesPriority(task.priority)}`}>
          {priorityTraduction(task.priority)}
        </span>
      </p>
      <p className="w-full bg-slate-200 rounded-md p-2">{task.text}</p>
      <div className="flex justify-evenly gap-10">
        <button
          onClick={handleShowModalEdit}
          className="submit-button text-white bg-indigo-600 rounded-md hover:bg-indigo-700 max-w-[200px]"
        >
          Editar
        </button>
        <button
          onClick={handleShowModalDelete}
          className="submit-button text-white bg-red-600 rounded-md hover:bg-red-700 max-w-[200px]"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
