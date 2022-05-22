import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, Stack, Heading, Button, Flex, useDisclosure,
    Input, HStack, InputGroup, InputRightElement
} from '@chakra-ui/react'

import { Link as RouterLink, useLocation } from "react-router-dom"
import CategoryModerator from '../components/Moderator/CategoryModerator';
import PointBox from "../components/Moderator/PointBox";
import { POIToAcceptMock } from '../mocks/POIToAcceptMock';
import { categoryData } from '../mocks/CategoryMock';
import { categoryToAcceptMock } from '../mocks/CategoryToAcceptMock';
import { useEffect, useState } from 'react';
import AddButton from '../components/Buttons/AddButton';
import DeleteCategoryModal from '../components/Moderator/DeleteCategoryModal';
import InfiniteScroll from 'react-infinite-scroller';
import { SearchIcon } from '@chakra-ui/icons';

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

    const [categoriesCounter, setCategoriesCounter] = useState(1);
    const [hasMoreCategories, setHasMoreCategories] = useState(true);
    const [categoriesHook, setCategoriesHook] = useState(() => initialLoadCategories());

    function initialLoad(ctr, arr) {
        let from = 0;
        let to = ctr * 10;
        let points = arr.slice(from, to);
        return points;
    }

    function initialLoadCategories() {
        return initialLoad(categoriesCounter, categoryToAcceptMock)
    }

    function initialLoadPoints() {
        return initialLoad(pointsCounter, POIToAcceptMock);
    }

    // function resetPoints() {
    //     if (pointsCounter != 1) {
    //         setPointsCounter(1);
    //         setPointsHook(initialLoadPoints());
    //         setHasMorePoints(true);
    //         pointsToAccept = null;
    //     }
    // }

    function loadMoreCategories() {
        let from = categoriesCounter * 10;
        let to = (categoriesCounter + 1) * 10;
        let points = categoryToAcceptMock.slice(from, to);
        setCategoriesCounter(categoriesCounter + 1);
        setCategoriesHook([...categoriesHook, ...points]);
        if (to > categoryToAcceptMock.length) {
            setHasMoreCategories(false);
        }
    }

    function loadMorePoints() {
        let from = pointsCounter * 10;
        let to = (pointsCounter + 1) * 10;
        let points = POIToAcceptMock.slice(from, to);
        setPointsCounter(pointsCounter + 1);
        setPointsHook([...pointsHook, ...points]);
        if (to > POIToAcceptMock.length) {
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

    const categories = categoriesHook.map((obj) =>
        <CategoryModerator
            id={obj.Id}
            name={obj.Name}
            onOpen={onOpen}
            setCategoryIdToDelete={setCategoryIdToDelete}
            setCategoryNameToDelete={setCategoryNameToDelete}
        />
    );

    const pointsToAccept = pointsHook.map((obj) =>
        <PointBox
            id={obj.Id}
            name={obj.Name}
            author={obj.Author}
            category={obj.Category}
            x={obj.X}
            y={obj.Y}
            description={obj.description}
            setPointIdToManage={setPointIdToManage}
            setPointNameToManage={setPointNameToManage}
            pointType="toAccept"
        />
    );

    const existingPoints = POIToAcceptMock.map((obj) =>
    <PointBox
        id={obj.Id}
        name={obj.Name}
        author={obj.Author}
        category={obj.Category}
        x={obj.X}
        y={obj.Y}
        description={obj.description}
        setPointIdToManage={setPointIdToManage}
        setPointNameToManage={setPointNameToManage}
        pointType="existing"
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
                            <Tab >Categories</Tab>
                        </TabList>

                        <TabPanels>
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
                                        {pointsToAccept}
                                    </InfiniteScroll>
                                </Stack>
                            </TabPanel>

                            <TabPanel>
                                <Box mb={"30px"}>
                                    <InputGroup>
                                        <Input bg={"gray.800"} placeholder="point name or id"></Input>
                                        <Button leftIcon={<SearchIcon></SearchIcon>} width={"120px"} ml={"2"}
                                        variant={"outline"}
                                        >Find</Button>
                                    </InputGroup>
                                </Box>
                                {existingPoints}
                            </TabPanel>
                            
                            <TabPanel>
                                <AddButton as={RouterLink} to="/moderatorpanel/addcategory"
                                    w={"100%"}>
                                    Add Category
                                </AddButton>

                                <Box mt={"10px"} mb={"30px"}>
                                    <InputGroup>
                                        <Input bg={"gray.800"} placeholder="find category"></Input>
                                        <Button leftIcon={<SearchIcon></SearchIcon>} width={"120px"} ml={"2"}
                                        variant={"outline"}
                                        >Find</Button>
                                    </InputGroup>
                                </Box>

                                <DeleteCategoryModal id={categoryIdToDelete} name={categoryNameToDelete} isOpen={isOpen} onClose={onClose} />
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={loadMoreCategories}
                                    hasMore={hasMoreCategories}
                                    loader={<div className="loader" key={0}>Loading ...</div>}
                                >
                                    {categories}
                                </InfiniteScroll>

                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            )}

        </Box>
    );
}