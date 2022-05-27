import {useState} from "react";

export default function useOpenStatus(){
    const [isOpen, setModalIsOpen] = useState(false);

    const onOpen = () => {
        setModalIsOpen(true);
    }

    const onClose = () => {
        setModalIsOpen(false);
    }

    return {isOpen, onOpen, onClose};
}