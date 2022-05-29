import React, {useEffect, useState} from "react";
import {Box, Button} from "@chakra-ui/react";
import BaseTabPanel from "./BaseTabPanel";
import {getPoisForUser} from "../../../socialMapApi/poiRequests";
import InvitationBoiBox from "../PoiBoxes/InvitationBoiBox";

export default function InvitationPointsTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedInvitationPoints, setFetchedInvitationPoints] = useState([]);
    const [filteredInvitationPoints, setFilteredInvitationPoints] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getPoisForUser(ac.signal, false, false, true).catch(console.error);
            //console.log(res);
            if (res?.ok) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedInvitationPoints(res.data);
                setFilteredInvitationPoints(res.data);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedInvitationPoints.filter(x => x.name.toLowerCase().includes(input.toLowerCase())
            || x.categories.some(c => c.name.toLowerCase().includes(input.toLowerCase())));
        setFilteredInvitationPoints(filtered);
    }

    const onInvitationPointDelete = (id) => {
        const withoutDeleted = fetchedInvitationPoints.filter(x => x.id !== id)
        setFetchedInvitationPoints(withoutDeleted);
        const withoutDeletedFiltered = filteredInvitationPoints.filter(x => x.id !== id)
        setFilteredInvitationPoints(withoutDeletedFiltered);
    }

    const createInvitationPointComponentList = (dataList) => {
        return dataList.map((p) =>
            <React.Fragment key={p.id}>
                <InvitationBoiBox
                    poiData={p}
                    onInvitationPointDelete={onInvitationPointDelete}
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
                        filteredData={filteredInvitationPoints}
                        searchPlaceholder={"point name or category"}
                        filterData={filter}
                        createDataComponentList={createInvitationPointComponentList}
                    />
                </React.Fragment>
            )
            }
        </React.Fragment>
    );
}