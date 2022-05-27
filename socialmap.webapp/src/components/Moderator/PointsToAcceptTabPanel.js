import React, {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import BaseTabPanel from "../UserPanel/PoiBoxes/BaseTabPanel";
import {POIToAcceptMock} from "../../mocks/POIToAcceptMock";
import PointBox from "./PointBox";

export default function PointsToAcceptTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedPointsToAccept, setFetchedPointsToAccept] = useState([]);
    const [filteredPointsToAccept, setFilteredPointsToAccept] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            //const res = await getCategories(ac.signal).catch(console.error);
            const res = POIToAcceptMock;
            if (res !== null && res !== undefined) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedPointsToAccept(res);
                setFilteredPointsToAccept(res);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedPointsToAccept.filter(x => x.name.toLowerCase().includes(input.toLowerCase()) || x.id == input);
        setFilteredPointsToAccept(filtered);
    }

    const onPointToAcceptDelete = (id) => {
        const withoutDeleted = fetchedPointsToAccept.filter(x => x.id !== id)
        setFetchedPointsToAccept(withoutDeleted);
        const withoutDeletedFiltered = filteredPointsToAccept.filter(x => x.id !== id)
        setFilteredPointsToAccept(withoutDeletedFiltered);
    }

    const pointsToAccept = (list) => {
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
                pointType="toAccept"
            />
        );
    }

    return (
        <React.Fragment>
            {isLoading ? (
                    <Button width={"100%"} isLoading={true}></Button>
                ) : (
                    <BaseTabPanel
                        filteredData={filteredPointsToAccept}
                        searchPlaceholder={"point name or id"}
                        filterData={filter}
                        createDataComponentList={pointsToAccept}
                    />
                )
            }
        </React.Fragment>
    );
}