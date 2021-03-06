import React, {useEffect, useState} from "react";
import {Box, Button} from "@chakra-ui/react";
import BaseInfiniteScrollPanel from "./BaseInfiniteScrollPanel";
import {getPoisForUser} from "../../../socialMapApi/poiRequests";
import AccessedPoiBox from "../PoiBoxes/AccessedPoiBox";
import SearchInput from "../../Buttons/SearchInput";

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
            || x.categories.some(c => c.name.toLowerCase().includes(input.toLowerCase())));
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
                    onAccessedPointDelete={onAccessedPointDelete}
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
                    <Box mb={"30px"}>
                        <SearchInput placeholder={"point name or category"} findFromInput={filter}/>
                    </Box>
                    <BaseInfiniteScrollPanel
                        allData={filteredAccessedPoints}
                        createDataComponentList={createAccessedPointComponentList}
                    />
                </React.Fragment>
            )
            }
        </React.Fragment>
    );
}