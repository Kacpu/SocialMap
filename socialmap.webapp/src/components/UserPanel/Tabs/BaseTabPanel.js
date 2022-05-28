import {Box, Stack} from "@chakra-ui/react";
import SearchInput from "../../Buttons/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useState} from "react";

export default function BaseTabPanel(props) {
    const [dataCounter, setDataCounter] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loadedData, setLoadedData] = useState([]);

    const elemPerLoad = 10;

    useEffect(() => {
        setHasMoreData(true);
        setLoadedData(getSliceOfData(0, props.filteredData));
    }, [props.filteredData])

    function getSliceOfData(fromIdx, data) {
        let from = fromIdx * elemPerLoad;
        let to = (fromIdx + 1) * elemPerLoad;
        setDataCounter(fromIdx + 1);
        if (to > data.length) {
            setHasMoreData(false);
        }
        return data.slice(from, to);
    }

    function loadMoreData() {
        let data = getSliceOfData(dataCounter, props.filteredData);
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
            <Box mb={"30px"}>
                <SearchInput placeholder={props.searchPlaceholder} findFromInput={props.filterData}/>
            </Box>
            <Stack spacing={5}>
                <InfiniteScroll
                    dataLength={loadedData.length}
                    next={loadMoreData}
                    hasMore={hasMoreData}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center', marginTop: 12}}>
                            <b>No more data!</b>
                        </p>
                    }
                >
                    {dataComponentList}
                </InfiniteScroll>
            </Stack>
        </React.Fragment>
    );
}