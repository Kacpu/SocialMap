import {Box, Button, Stack, Text} from "@chakra-ui/react";
import SearchInput from "../../Buttons/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useState} from "react";

export default function BaseInfiniteScrollPanel(props) {
    const [dataCounter, setDataCounter] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loadedData, setLoadedData] = useState([]);

    const elemPerLoad = 10;

    useEffect(() => {
        setHasMoreData(true);
        setLoadedData(getSliceOfData(0, props.allData));
    }, [props.allData])

    function getSliceOfData(fromIdx, data) {
        if (!data) {
            return [];
        }
        let from = fromIdx * elemPerLoad;
        let to = (fromIdx + 1) * elemPerLoad;
        setDataCounter(fromIdx + 1);
        if (to > data.length) {
            setHasMoreData(false);
        }
        return data.slice(from, to);
    }

    function loadMoreData() {
        let data = getSliceOfData(dataCounter, props.allData);
        setLoadedData([...loadedData, ...data]);
    }

    // function filterData(searchInput) {
    //     setSearchValue(searchInput);
    //     let newData = props.filterData(searchInput);
    //     setHasMoreData(true);
    //     setFilteredData(newData);
    //     setLoadedData(getSliceOfData(0, newData));
    // }

    const dataComponentList = props.createDataComponentList(loadedData);

    return (
        <React.Fragment>
            {/*<Box mb={"30px"}>*/}
            {/*    <SearchInput placeholder={props.searchPlaceholder} findFromInput={props.filterData}/>*/}
            {/*</Box>*/}
            {/*<Stack>*/}
            <InfiniteScroll
                dataLength={loadedData.length}
                next={loadMoreData}
                hasMore={hasMoreData}
                loader={<Button width={"100%"} isLoading={true}></Button>}
                endMessage={
                    <Text mt={3} align={"center"} color={"gray.500"}>No
                        more {typeof props.dataName == "string" ? props.dataName : "data"}!
                    </Text>
                }
            >
                {dataComponentList}
            </InfiniteScroll>
            {/*</Stack>*/}
        </React.Fragment>
    );
}