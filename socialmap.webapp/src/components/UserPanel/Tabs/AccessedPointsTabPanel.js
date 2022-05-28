import React, {useEffect, useState} from "react";
import {Box, Button} from "@chakra-ui/react";
import BaseTabPanel from "../PoiBoxes/BaseTabPanel";
import {getPoisForUser} from "../../../socialMapApi/poiRequests";
import AccessedPoiBox from "../PoiBoxes/AccessedPoiBox";

export default function AccessedPointsTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedAccessedPoints, setFetchedAccessedPoints] = useState([]);
    const [filteredAccessedPoints, setFilteredAccessedPoints] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getPoisForUser(ac.signal, false, true).catch(console.error);
            if (res?.ok) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedAccessedPoints(res.data);
                setFilteredAccessedPoints(res.data);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedAccessedPoints.filter(x => x.name.toLowerCase().includes(input.toLowerCase())
            || x.categoryDTOs.some(c => c.name.toLowerCase().includes(input.toLowerCase())));
        setFilteredAccessedPoints(filtered);
    }

    const onAccessedPointDelete = (id) => {
        const withoutDeleted = fetchedAccessedPoints.filter(x => x.id !== id)
        setFetchedAccessedPoints(withoutDeleted);
        const withoutDeletedFiltered = filteredAccessedPoints.filter(x => x.id !== id)
        setFilteredAccessedPoints(withoutDeletedFiltered);
    }

    const createAccessedPointComponentList = (dataList) => {
        return dataList.map((p) =>
            <React.Fragment key={p.id}>
                <AccessedPoiBox
                    poiData={p}
                />
                <Box height={0.5} border={'none'} bg={'gray.600'} opacity={0.5} my={3}
                     boxShadow={'0 3px 10px -0.5px gray'}/>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <Button width={"100%"} isLoading={true}></Button>
            ) : (
                <React.Fragment>
                    <BaseTabPanel
                        filteredData={filteredAccessedPoints}
                        searchPlaceholder={"point name or category"}
                        filterData={filter}
                        createDataComponentList={createAccessedPointComponentList}
                    />
                </React.Fragment>
            )
            }
        </React.Fragment>
    );
}