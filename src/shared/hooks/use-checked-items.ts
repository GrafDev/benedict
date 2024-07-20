import { useCommon } from "../store/zustand";
import {useState} from "react";

export const useCheckedItems = (): {
    checkedItems: number[];
    handleCheckChange: (index: number, checked: boolean) => void;
} => {
    const setCheckedItems = useCommon((store) => store.setCheckedItems);
    const [checkedItems, setCheckedItemsState] = useState<number[]>([]); // Manage checked items state

    const handleCheckChange = (index: number, checked: boolean) => {
        setCheckedItemsState((prevCheckedItems) => {
            const updatedCheckedItems = [...prevCheckedItems];
            if (checked) {
                // Add index if newly checked
                if (!updatedCheckedItems.includes(index)) {
                    updatedCheckedItems.push(index);
                }
            } else {
                // Remove index if unchecked
                const filteredIndex = updatedCheckedItems.indexOf(index);
                if (filteredIndex !== -1) {
                    updatedCheckedItems.splice(filteredIndex, 1);
                }
            }
            return updatedCheckedItems;
        });

        // Update checked items in the store
        setCheckedItems(checkedItems); // Correctly pass checkedItems
    };

    return {
        checkedItems,
        handleCheckChange,
    };
};
