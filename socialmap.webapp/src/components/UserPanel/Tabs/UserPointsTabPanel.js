import React, {useEffect, useState} from "react";
import {Box, Button} from "@chakra-ui/react";
import AddButton from "../../Buttons/AddButton";
import {Link as RouterLink} from "react-router-dom";
import BaseTabPanel from "./BaseTabPanel";
import {getPoisForUser} from "../../../socialMapApi/poiRequests";
import UserPoiBox from "../PoiBoxes/UserPoiBox";

export default function UserPointsTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedUserPoints, setFetchedUserPoints] = useState([]);
    const [filteredUserPoints, setFilteredUserPoints] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getPoisForUser(ac.signal, true).catch(console.error);
            if (res?.ok) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedUserPoints(res.data);
                setFilteredUserPoints(res.data);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedUserPoints.filter(x => x.name.toLowerCase().includes(input.toLowerCase())
            || x.categories.some(c => c.name.toLowerCase().includes(input.toLowerCase())));
        setFilteredUserPoints(filtered);
    }

    const onUserPointDelete = (id) => {
        const withoutDeleted = fetchedUserPoints.filter(x => x.id !== id)
        setFetchedUserPoints(withoutDeleted);
        const withoutDeletedFiltered = filteredUserPoints.filter(x => x.id !== id)
        setFilteredUserPoints(withoutDeletedFiltered);
    }

    const createUserPointComponentList = (dataList) => {
        return dataList.map((p) =>
            <React.Fragment key={p.id}>
                <UserPoiBox
                    poiData={p}
                    onUserPointDelete={onUserPointDelete}
                />
                <Box height={0.5} border={'none'} bg={'gray.600'} opacity={0.5} my={3}/>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <Button width={"100%"} isLoading={true}></Button>
            ) : (
                <React.Fragment>
                    <AddButton as={RouterLink} to="/addpoint" w={"100%"} mb={"4"}>
                        Add Point
                    </AddButton>
                    <BaseTabPanel
                        filteredData={filteredUserPoints}
                        searchPlaceholder={"point name or category"}
                        filterData={filter}
                        createDataComponentList={createUserPointComponentList}
                    />
                </React.Fragment>
            )
            }
        </React.Fragment>
    );
}