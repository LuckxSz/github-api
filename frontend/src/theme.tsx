interface Variant {
  background: string;
  input: string;
  button: string;
}

export const variants: Record<"dark" | "light", Variant> = {
  dark: {
    background: "bg-black gap-6 text-white p-6 text-[#E0E0E0]",
    input:
      " border border-[#046E8F] px-4 py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#38AECC] focus:outline-none",
    button:
      "rounded-2xl px-6 py-3 font-semibold   bg-white text-black  shadow-md  hover:shadow-xl  hover:scale-105  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38AECC]",
  },
  light: {
    background: "bg-white gap-6  p-6 text-[#4c8fed]",
    input:
      " border border-[#046E8F] px-4 py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#38AECC] focus:outline-none",
    button:
      "rounded-2xl px-6 py-3 font-semibold  bg-black text-white  shadow-md  hover:shadow-xl  hover:scale-105  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38AECC]",
  },
};
