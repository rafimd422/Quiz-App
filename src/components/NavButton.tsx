"use client";

type Props = { text: string, onClick:()=>void };

const NavButton = ({ text,onClick }: Props) => {
  return (
    <button className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-md font-bold transition-all hover:-translate-y-[2px] md:block"
    onClick={onClick}
    >
    {text}
    </button>
  );
};

export default NavButton;