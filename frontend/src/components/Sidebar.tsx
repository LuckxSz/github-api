import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { ImCross } from "react-icons/im";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setOpen(!open)}
        className="m-4 cursor-pointer rounded-4xl bg-gray-800 p-2 text-white transition hover:bg-gray-700"
      >
        {open ? (
          <ImCross className="transition" size={24} />
        ) : (
          <FiMenu className="transition" size={24} />
        )}
      </button>

      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: open ? 220 : 0 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer overflow-hidden rounded-4xl bg-gray-900 text-gray-100 shadow-lg"
      >
        <nav className="flex flex-col gap-5 p-3">
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-800"
          >
            <FiHome />{" "}
            <span className={`${open ? "block" : "hidden"}`}>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-800"
          >
            <FiUser />{" "}
            <span className={`${open ? "block" : "hidden"}`}>Perfil</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-800"
          >
            <FiSettings />{" "}
            <span className={`${open ? "block" : "hidden"}`}>
              Configurações
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-800"
          >
            <FiLogOut />{" "}
            <span className={`${open ? "block" : "hidden"}`}>
              Login / Logout
            </span>
          </a>
        </nav>
      </motion.aside>
    </div>
  );
};
