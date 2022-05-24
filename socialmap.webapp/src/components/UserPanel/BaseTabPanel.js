import {Box, Button, Stack} from "@chakra-ui/react";
import SearchInput from "../Moderator/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useState} from "react";

export default function BaseTabPanel(props) {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [dataCounter, setDataCounter] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loadedData, setLoadedData] = useState([]);

    const elemPerLoad = 10;

    useEffect(() => {
        (async () => {
            //console.log("here")
            let res = await props.fetchData();
            if (res !== null) {
                setFetchedData(res);
                setIsDataLoading(false);

                setFilteredData(res);
            }
        })();
    }, [props]);

    useEffect(() => {
        if (!isDataLoading) {
            //console.log(isDataLoading)
            loadMoreData();
        }
    }, [filteredData])

    function loadMoreData() {
        //console.log("pum");
        let from = dataCounter * elemPerLoad;
        let to = (dataCounter + 1) * elemPerLoad;
        let data = filteredData.slice(from, to);
        setDataCounter(dataCounter + 1);
        setLoadedData([...loadedData, ...data]);
        if (to > filteredData.length) {
            setHasMoreData(false);
        }
    }

    function filterData(inputValue) {
        let newData = props.filterData(fetchedData, inputValue);
        setDataCounter(0);
        setHasMoreData(true);
        setLoadedData([]);
        setFilteredData(newData);
    }

    const dataComponentList = props.createDataComponentList(loadedData);

    return (
        <React.Fragment>
            {isDataLoading ? (
                <Button width={"100%"} isLoading={true}></Button>
            ) : (
                <React.Fragment>
                    <Box mb={"30px"}>
                        <SearchInput placeholder={props.searchPlaceholder} findFromInput={filterData}/>
                    </Box>

                    <Stack spacing={5}>
                        <InfiniteScroll
                            dataLength={loadedData.length}
                            next={loadMoreData}
                            hasMore={hasMoreData}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                    <b>No more points to accept!</b>
                                </p>
                            }
                        >
                            {dataComponentList}
                        </InfiniteScroll>
                    </Stack>
                </React.Fragment>)}
        </React.Fragment>
    );
}