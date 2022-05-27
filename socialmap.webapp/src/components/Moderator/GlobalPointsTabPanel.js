import React, {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import BaseTabPanel from "../UserPanel/PoiBoxes/BaseTabPanel";
import {POIToAcceptMock} from "../../mocks/POIToAcceptMock";
import PointBox from "./PointBox";

export default function GlobalPointsTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedGlobalPoints, setFetchedGlobalPoints] = useState([]);
    const [filteredGlobalPoints, setFilteredGlobalPoints] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            //const res = await getCategories(ac.signal).catch(console.error);
            const res = POIToAcceptMock;
            if (res !== null && res !== undefined) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedGlobalPoints(res);
                setFilteredGlobalPoints(res);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedGlobalPoints.filter(x => x.name.toLowerCase().includes(input.toLowerCase()) || x.id == input);
        setFilteredGlobalPoints(filtered);
    }

    const onGlobalPointDelete = (id) => {
        const withoutDeleted = fetchedGlobalPoints.filter(x => x.id !== id)
        setFetchedGlobalPoints(withoutDeleted);
        const withoutDeletedFiltered = filteredGlobalPoints.filter(x => x.id !== id)
        setFilteredGlobalPoints(withoutDeletedFiltered);
    }

    const globalPoints = (list) => {
        return list.map((obj) =>
            <PointBox
                key={obj.Id}
                id={obj.Id}
                name={obj.Name}
                author={obj.Author}
                category={obj.Category}
                x={obj.X}
                y={obj.Y}
                description={obj.description}
                //setPointIdToManage={setPointIdToManage}
                //setPointNameToManage={setPointNameToManage}
                pointType="existing"
            />
        );
    }

    return (
        <React.Fragment>
            {isLoading ? (
                    <Button width={"100%"} isLoading={true}></Button>
                ) : (
                    <BaseTabPanel
                        filteredData={filteredGlobalPoints}
                        searchPlaceholder={"point name or id"}
                        filterData={filter}
                        createDataComponentList={globalPoints}
                    />
                )
            }
        </React.Fragment>
    );
}