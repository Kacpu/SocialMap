import BaseInfiniteScrollPanel from "../UserPanel/Tabs/BaseInfiniteScrollPanel";
import React, {useEffect, useState} from "react";
import {Box, Button} from "@chakra-ui/react";
import {getCategories} from "../../socialMapApi/categoryRequests";
import CategoryModerator from "./CategoryModerator";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AddButton from "../Buttons/AddButton";
import SearchInput from "../Buttons/SearchInput";

export default function CategoryTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getCategories(ac.signal).catch(console.error);
            if (res?.ok) {
                //console.log("get req " + props.searchPlaceholder)
                const sortData = res.data?.sort(c => c.name);
                setFetchedCategories(sortData);
                setFilteredCategories(sortData);
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

    const onAddCategory = () => {
        navigate("/moderatorpanel/addcategory", {state: {beforeSite: "/moderatorpanel/#categories"}})
    }

    return (
        <React.Fragment>
            {isLoading ? (
                    <Button width={"100%"} isLoading={true}></Button>
                ) : (
                    <React.Fragment>
                        <AddButton w={"100%"} mb={"4"} onClick={onAddCategory}>
                            Add Category
                        </AddButton>
                        <Box mb={"30px"}>
                            <SearchInput placeholder={"category name or id"} findFromInput={filter}/>
                        </Box>
                        <BaseInfiniteScrollPanel
                            allData={filteredCategories}
                            createDataComponentList={categories}
                        />
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
}