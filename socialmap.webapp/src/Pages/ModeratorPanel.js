import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, Stack, Heading, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from "react-router-dom"
import CategoryModerator from '../components/Moderator/CategoryModerator';
import PointToAccept from "../components/Moderator/PointToAccept";
import { POIToAcceptMock } from '../mocks/POIToAcceptMock';
import { categoryData } from '../mocks/CategoryMock';
import { useEffect, useState } from 'react';
import AddButton from '../components/Buttons/AddButton';
import DeleteCategoryModal from '../components/Moderator/DeleteCategoryModal';
import InfiniteScroll from 'react-infinite-scroller';

export default function ModeratorPanel() {

    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const [categoryHook, setCategoryHook] = useState("");
    const [loading, setLoading] = useState(false);

    const [categoryIdToDelete, setCategoryIdToDelete] = useState(undefined);
    const [categoryNameToDelete, setCategoryNameToDelete] = useState(undefined);

    const [pointIdToManage, setPointIdToManage] = useState(undefined);
    const [pointNameToManage, setPointNameToManage] = useState(undefined);


    const { isOpen, onOpen, onClose } = useDisclosure()
    const { hash } = useLocation();

    const [pointsCounter, setPointsCounter] = useState(1);
    const [hasMorePoints, setHasMorePoints] = useState(true);
    const [pointsHook, setPointsHook] = useState(() => initialLoadPoints());

    function initialLoadPoints() {
        let from = 0
        let to = pointsCounter * 2
        let points = POIToAcceptMock.slice(from, to);
        return points
    }

    function loadMorePoints() {
        let from = pointsCounter * 2;
        let to = (pointsCounter+1)*2;
        let points = POIToAcceptMock.slice(from, to);
        setPointsCounter(pointsCounter+1);
        setPointsHook([...pointsHook, ...points]);
        if(to > POIToAcceptMock.length){
            setHasMorePoints(false);
        }
    }


    const focusOnName = (name) => {
        let index = 0;
        switch (name) {
            case "#categories":
                index = 2;
                break;
            case "#acceptPoints":
                index = 0;
                break;
            case "#existPoints":
                index = 1;
                break;
            default:
                index = 0;
                break;
        }
        return index;
    };

    const categories = categoryData.map((obj) =>
        <CategoryModerator
            id={obj.id}
            name={obj.name}
            onOpen={onOpen}
            setCategoryIdToDelete={setCategoryIdToDelete}
            setCategoryNameToDelete={setCategoryNameToDelete}
        />
    );

    const pointsToAccept = pointsHook.map((obj) =>
        <PointToAccept
            id={obj.Id}
            name={obj.Name}
            author={obj.Author}
            category={obj.Category}
            x={obj.X}
            y={obj.Y}
            description={obj.description}
            setPointIdToManage={setPointIdToManage}
            setPointNameToManage={setPointNameToManage}
        />
    );

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems='center' mb={20}>
            <Stack alignItems={'center'} mt={8}>
                <Heading fontSize={30} textAlign={'center'}>Moderator's Panel</Heading>
            </Stack>
            {loading ? (
                <Button isLoading={true}></Button>
            ) : (
                <Box width={'90vw'} bgColor={boxColor} mt={8} rounded={'lg'}>
                    <Tabs defaultIndex={focusOnName(hash)}>
                        <TabList>
                            <Tab>Accept Points</Tab>
                            <Tab >Existing Points</Tab>
                            <Tab>Categories</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={5}>
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={loadMorePoints}
                                        hasMore={hasMorePoints}
                                        loader={<div className="loader" key={0}>Loading ...</div>}
                                    >
                                        {pointsToAccept}
                                    </InfiniteScroll>
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <p>Existed Points</p>
                            </TabPanel>
                            <TabPanel>
                                <AddButton as={RouterLink} to="/moderatorpanel/addcategory"
                                    w={"100%"}>
                                    Add Category
                                </AddButton>
                                <DeleteCategoryModal id={categoryIdToDelete} name={categoryNameToDelete} isOpen={isOpen} onClose={onClose} />
                                {categories}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            )}

        </Box>
    );
}