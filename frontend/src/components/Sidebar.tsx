import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { ImCross } from "react-icons/im";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { icon: <FiHome />, label: "Home" },
    { icon: <FiUser />, label: "Perfil" },
    { icon: <FiSettings />, label: "Configurações" },
    { icon: <FiLogOut />, label: "Login / Logout" },
  ];

  return (
    <div className="">
      {/* Botão toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="m-4 cursor-pointer rounded-2xl bg-gray-800 p-2 text-white transition hover:bg-gray-700"
      >
        {open ? <ImCross size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar animada */}
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: open ? 220 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-2xl bg-gray-900 text-gray-100 shadow-lg"
      >
        <motion.nav
          className="flex flex-col gap-5 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {links.map(({ icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-800"
              onClick={() => toast(`${label} under construction!`)}
            >
              {icon} <span className={open ? "block" : "hidden"}>{label}</span>
            </a>
          ))}
        </motion.nav>
      </motion.aside>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
