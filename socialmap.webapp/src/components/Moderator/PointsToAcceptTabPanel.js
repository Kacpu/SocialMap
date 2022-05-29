import React, {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import BaseTabPanel from "../UserPanel/Tabs/BaseTabPanel";
import {POIToAcceptMock} from "../../mocks/POIToAcceptMock";
import PointBox from "./PointBox";
import {getPois} from "../../socialMapApi/poiRequests";

export default function PointsToAcceptTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedPointsToAccept, setFetchedPointsToAccept] = useState([]);
    const [filteredPointsToAccept, setFilteredPointsToAccept] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getPois(ac.signal, null, true, false).catch(console.error);
            //const res = {ok: true, data: POIToAcceptMock};
            if (res?.ok) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedPointsToAccept(res.data);
                setFilteredPointsToAccept(res.data);
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

    const onPointToAcceptRemove = (id) => {
        const withoutDeleted = fetchedPointsToAccept.filter(x => x.id !== id)
        setFetchedPointsToAccept(withoutDeleted);
        const withoutDeletedFiltered = filteredPointsToAccept.filter(x => x.id !== id)
        setFilteredPointsToAccept(withoutDeletedFiltered);
    }

    const pointsToAccept = (list) => {
        return list.map((p) =>
            <PointBox
                key={p.id}
                id={p.id}
                name={p.name}
                author={p.creatorName}
                category={p.categories.length > 0 ? p.categories[0].name : "no category"}
                x={p.x}
                y={p.y}
                description={p.description}
                onPointToAcceptRemove={onPointToAcceptRemove}
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