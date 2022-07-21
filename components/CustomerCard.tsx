import Link from "next/link";
import { CustomerInfo } from "../types/customer";

interface Props {
  customer: CustomerInfo;
  showModalDelete: (value: {
    operation: "add" | "delete" | "edit";
    value: boolean;
  }) => void;
  handleSelectedCustomer: (customer: CustomerInfo) => void;
}

export default function CustomerCard({ customer, showModalDelete, handleSelectedCustomer }: Props) {
  const handleDeleteCustomer = async () => {
    showModalDelete({ operation: "delete", value: true });
    handleSelectedCustomer(customer);
  }

  return (
    <div className="mt-5 bg-white w-full rounded-md text-left p-2 lg:px-5 md:py-3 space-y-1 md:flex md:items-center shadow-md">
      <div className="md:w-2/3 lg:w-9/12 lg:space-y-1">
        <p className="uppercase text-gray-600 font-bold">
          Cliente:{" "}
          <span className="normal-case text-black font- font-semibold">
            {customer.name}
          </span>
        </p>
        <p className="uppercase text-gray-600 font-bold">
          Email:{" "}
          <span className="normal-case text-black font- font-semibold">
            {customer.email}
          </span>
        </p>
        <p className="uppercase text-gray-600 font-bold">
          Numero de Mascotas:{" "}
          <span className="normal-case text-black font- font-semibold">
            {customer.num_pets ?? 0}
          </span>
        </p>
        <p className="uppercase text-gray-600 font-bold">
          Citas completadas:{" "}
          <span className="normal-case text-black font- font-semibold">
            {customer.citas_terminadas ?? 0}
          </span>
        </p>
        <p className="uppercase text-gray-600 font-bold">
          Citas pendientes:{" "}
          <span className="normal-case text-black font- font-semibold">
            {customer.citas_pendientes ?? 0}
          </span>
        </p>
      </div>
      <div className="flex justify-around md:flex-col md:space-y-2 md:w-1/3 lg:w-3/12">
        <Link href={`/customer/${customer.id}`}>
          <p className="submit-button text-center bg-yellow-400 hover:bg-yellow-500 rounded-md text-white max-w-[100px] md:max-w-none text-sm md:m-0 ">
            Detalles
          </p>
        </Link>
        <Link
          href={`/customer/${customer.id}/new-appointment`}
        >
          <p className="submit-button text-center bg-indigo-600 hover:bg-indigo-700 rounded-md text-white max-w-[100px] md:max-w-none text-sm md:m-0" >Nueva Cita</p>
        </Link>
        <button
          className="submit-button text-center bg-red-600 hover:bg-red-700 rounded-md text-white max-w-[100px] md:max-w-none text-sm md:m-0 "
          onClick={handleDeleteCustomer}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
