import {
    Box,
    Button,
    Input,
    InputGroup,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import InfiniteScroll from "react-infinite-scroller";
import React, {useEffect, useState} from "react";
import {getPois} from "../../socialMapApi/poiRequests";
import PoiBox from "./PoiBox";

export default function UserTable(){
    const boxColor = useColorModeValue('gray.600', 'gray.700');

    const [isLoading, setIsLoading] = useState(true);

    const [fetchedUserPoints, setFetchedUserPoints] = useState([]);
    const [pointsCounter, setPointsCounter] = useState(0);
    const [hasMorePoints, setHasMorePoints] = useState(true);
    const [loadedUserPoints, setLoadedUserPoints] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getPois().catch(console.error);
            console.log(res);
            setFetchedUserPoints(res);
            if (res != null) {
                setIsLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            loadMorePoints();
        }
    }, [isLoading])

    function loadMorePoints() {
        let from = pointsCounter * 10;
        let to = (pointsCounter + 1) * 10;
        let points = fetchedUserPoints.slice(from, to);
        //console.log(points)
        setPointsCounter(pointsCounter + 1);
        setLoadedUserPoints([...loadedUserPoints, ...points]);
        if (to > fetchedUserPoints.length) {
            setHasMorePoints(false);
        }
    }

    const userPoints = loadedUserPoints.map((p) =>
        <React.Fragment key={p.id}>
            <PoiBox
                name={p.name}
                description={p.description}
                likesNumber={p.likesNumber}
                categoryDTOs={p.categoryDTOs}
                isGlobal={p.isGlobal}
                isAccepted={p.isAccepted}
                x={p.x}
                y={p.y}
            />
            <Box height={0.5} border={'none'} bg={'gray.600'} opacity={0.5} my={3} boxShadow={'0 3px 10px -0.5px gray'}/>
        </React.Fragment>
    );

    return (
        <Box width={'80vw'} bgColor={boxColor} mt={8} rounded={'lg'}>
            <Tabs>
                <TabList>
                    <Tab>Your Points</Tab>
                    <Tab>Accessed Points</Tab>
                    <Tab>Invited Points</Tab>
                </TabList>

                <TabPanels>
                    {isLoading ? (
                        <Button width={"100%"} isLoading={true}></Button>
                    ) : (
                        <TabPanel>
                            <Box mb={"30px"}>
                                <InputGroup>
                                    <Input bg={"gray.800"} placeholder="point name or id"></Input>
                                    <Button leftIcon={<SearchIcon></SearchIcon>} width={"120px"} ml={"2"}
                                            variant={"outline"}
                                    >Find</Button>
                                </InputGroup>
                            </Box>

                            <Stack spacing={5}>
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={loadMorePoints}
                                    hasMore={hasMorePoints}
                                    loader={<div className="loader" key={0}>Loading ...</div>}
                                >
                                    {userPoints}
                                </InfiniteScroll>
                            </Stack>
                        </TabPanel>
                    )}

                </TabPanels>
            </Tabs>
        </Box>
    );
}