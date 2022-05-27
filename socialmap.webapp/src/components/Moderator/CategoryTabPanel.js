import BaseTabPanel from "../UserPanel/PoiBoxes/BaseTabPanel";
import React, {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import {getCategories} from "../../socialMapApi/categoryRequests";
import CategoryModerator from "./CategoryModerator";
import {Link as RouterLink} from "react-router-dom";
import AddButton from "../Buttons/AddButton";

export default function CategoryTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getCategories(ac.signal).catch(console.error);
            if (res !== null && res !== undefined) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedCategories(res);
                setFilteredCategories(res);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedCategories.filter(x => x.name.toLowerCase().includes(input.toLowerCase()) || x.id == input);
        setFilteredCategories(filtered);
    }

    const onCategoryDelete = (id) => {
        const withoutDeleted = fetchedCategories.filter(x => x.id !== id)
        setFetchedCategories(withoutDeleted);
        const withoutDeletedFiltered = filteredCategories.filter(x => x.id !== id)
        setFilteredCategories(withoutDeletedFiltered);
    }

    const categories = (list) => {
        return list.map((obj) =>
            <CategoryModerator
                key={obj.id}
                id={obj.id}
                name={obj.name}
                onCategoryDelete={onCategoryDelete}
            />
        );
    }

    return (
        <React.Fragment>
            {isLoading ? (
                    <Button width={"100%"} isLoading={true}></Button>
                ) : (
                    <React.Fragment>
                        <AddButton as={RouterLink} to="/moderatorpanel/addcategory" w={"100%"} mb={"4"}>
                            Add Category
                        </AddButton>
                        <BaseTabPanel
                            filteredData={filteredCategories}
                            searchPlaceholder={"category name or id"}
                            filterData={filter}
                            createDataComponentList={categories}
                        />
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
}