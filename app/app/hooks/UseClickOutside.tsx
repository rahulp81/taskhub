import {useEffect} from "react";

type UseClickOutsideProps = {
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    dropdownRef:React.RefObject<HTMLDivElement | null> ,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UseClickOutside({ buttonRef , setIsActive,dropdownRef }: UseClickOutsideProps) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
                setIsActive(false);
            }
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
}