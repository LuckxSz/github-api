interface Variant {
  background: string;
  input: string;
  button: string;
  repository: string;
  info: string;
}

export const variants: Record<"dark" | "light", Variant> = {
  dark: {
    background: "bg-[#0b2652] ",
    input:
      " border border-[#046E8F] text-white px-4 py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#38AECC] focus:outline-none",
    button:
      "rounded-2xl px-6 py-3 font-semibold   bg-white text-black  shadow-md  hover:shadow-xl  hover:scale-105  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38AECC]",
    repository:
      "rounded-lg border border-[#046E8F]  bg-[#081f45] text-[#38AECC] p-4 shadow-sm transition-shadow hover:shadow-md",
    info: " text-white",
  },
  light: {
    background: "bg-white",
    input:
      " border border-[#046E8F] px-4 text-black py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#38AECC] focus:outline-none",
    button:
      "rounded-2xl px-6 py-3 font-semibold  bg-black text-white  shadow-md  hover:shadow-xl  hover:scale-105  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38AECC]",
    repository:
      "rounded-lg border border-[#046E8F] bg-[#183446] text-[#38AECC] p-4 shadow-sm transition-shadow hover:shadow-md",
    info: " text-[#046E8F]",
  },
};
