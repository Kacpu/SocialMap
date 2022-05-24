import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, Stack, Heading, Button, Flex, useDisclosure,
    Input, HStack, InputGroup, InputRightElement
} from '@chakra-ui/react'

import {Link as RouterLink, useLocation} from "react-router-dom"
import CategoryModerator from '../components/Moderator/CategoryModerator';
import PointBox from "../components/Moderator/PointBox";
import {POIToAcceptMock} from '../mocks/POIToAcceptMock';
import {categoryData} from '../mocks/CategoryMock';
import {categoryToAcceptMock} from '../mocks/CategoryToAcceptMock';
import {useEffect, useState} from 'react';
import AddButton from '../components/Buttons/AddButton';
import DeleteCategoryModal from '../components/Moderator/DeleteCategoryModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import {SearchIcon} from '@chakra-ui/icons';
import SearchInput from "../components/Moderator/SearchInput";

export default function ModeratorPanel() {

    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const [loading, setLoading] = useState(false);

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {hash} = useLocation();

    const [categoryIdToDelete, setCategoryIdToDelete] = useState(undefined);
    const [categoryNameToDelete, setCategoryNameToDelete] = useState(undefined);

    const [pointIdToManage, setPointIdToManage] = useState(undefined);
    const [pointNameToManage, setPointNameToManage] = useState(undefined);

    const [selectedTab, setSelectedTab] = useState(0);

    const fetchCategories = async (signal = null) => {
        //return await getPoisForUser(signal, true).catch(console.error);
        return categoryToAcceptMock;
    }

    const fetchPoints = async (signal = null) => {
        //return await getPoisForUser(signal, false, true).catch(console.error);
        return POIToAcceptMock;
    }

    const fetchPointsToAccept= async (signal = null) => {
        //return await getPoisForUser(signal, false, false, true).catch(console.error);
        return POIToAcceptMock;
    }

    const filter = (list, input) => list.filter(x => x.Name.toLowerCase().includes(input.toLowerCase()) || x.Id == input);

    function switchTab(id) {
        let usedData;
        switch (id) {
            case 0:
                if(allPointsToAccept.length == 0){
                    //fetch from API
                    setAllPointsToAccept(POIToAcceptMock);
                    usedData = POIToAcceptMock;
                }
                else{
                    usedData = allPointsToAccept;
                }
                setPartPointsToAccept(initialLoadPointsToAccept(usedData));

                //clear Categories
                setPartCategories([]);
                setAllFilteredCategories([]);
                setCategoriesCounter(1);
                setHasMoreCategories(true);

                //clear Existing points
                setPartPoints([]);
                setAllFilteredPoints([]);
                setPointsCounter(1);
                setHasMorePoints(true);

                break;

            case 1:
                if(allPoints.length == 0){
                    //fetch from API
                    setAllPoints(POIToAcceptMock);
                    usedData = POIToAcceptMock;
                }
                else{
                    usedData = allPoints;
                }
                setPartPoints(initialLoadPoints(usedData));

                //clear Categories
                setPartCategories([]);
                setAllFilteredCategories([]);
                setCategoriesCounter(1);
                setHasMoreCategories(true);

                //clear points to accept
                setPointsToAcceptCounter(1);
                setPartPointsToAccept([]);
                setAllFilteredPointsToAccept([]);
                setHasMorePointsToAccept(true);
                break;

            case 2:
                if(allCategories.length == 0){
                    console.log("brak!!!")
                    //fetch from API
                    setAllCategories(categoryToAcceptMock);
                    usedData = categoryToAcceptMock;
                }
                else{
                    usedData = allCategories;
                }
                setPartCategories(initialLoadCategories(usedData));

                //Clear points to accept
                setPointsToAcceptCounter(1);
                setPartPointsToAccept([]);
                setAllFilteredPointsToAccept([]);
                setHasMorePointsToAccept(true);

                //clear Existing points
                setPartPoints([]);
                setAllFilteredPoints([]);
                setPointsCounter(1);
                setHasMorePoints(true);
                break;
        }
        setSelectedTab(id);

    }

    function focusOnName(name){
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

    const categories = partCategories.map((obj) =>
        <CategoryModerator
            id={obj.Id}
            name={obj.Name}
            onOpen={onOpen}
            setCategoryIdToDelete={setCategoryIdToDelete}
            setCategoryNameToDelete={setCategoryNameToDelete}
        />
    );

    const pointsToAccept = partPointsToAccept.map((obj) =>
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

    const existingPoints = partPoints.map((obj) =>
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
                    <Tabs defaultIndex={() => focusOnName(hash)}>
                        <TabList>
                            <Tab onClick={() => switchTab(0)}>Accept Points</Tab>
                            <Tab onClick={() => switchTab(1)}>Existing Points</Tab>
                            <Tab onClick={() => switchTab(2)}>Categories</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box mb={"30px"}>
                                    <SearchInput placeholder="point name or id" findFromInput={findPointsToAccept}/>
                                </Box>

                                <Stack spacing={5}>
                                    {selectedTab == 0 ? (
                                            <InfiniteScroll
                                                dataLength={partPointsToAccept.length}
                                                next={loadMorePointsToAccept}
                                                hasMore={hasMorePointsToAccept}
                                                loader={<h4>Loading...</h4>}
                                                endMessage={
                                                    <p style={{textAlign: 'center'}}>
                                                        <b>No more points to accept!</b>
                                                    </p>
                                                }
                                            >
                                                {pointsToAccept}
                                            </InfiniteScroll>
                                        ) :
                                        (<></>)}
                                </Stack>
                            </TabPanel>

                            <TabPanel>
                                <Box mb={"30px"}>
                                    <SearchInput placeholder="point name or id" findFromInput={findPoints}/>
                                </Box>
                                {selectedTab == 1 ? (
                                        <InfiniteScroll
                                            dataLength={partPoints.length}
                                            next={loadMorePoints}
                                            hasMore={hasMorePoints}
                                            loader={<h4>Loading...</h4>}
                                            endMessage={
                                                <p style={{textAlign: 'center'}}>
                                                    <b>No more points!</b>
                                                </p>
                                            }
                                        >
                                            {existingPoints}
                                        </InfiniteScroll>
                                    ) :
                                    (<></>)}
                            </TabPanel>

                            <TabPanel>

                                <AddButton as={RouterLink} to="/moderatorpanel/addcategory"
                                           w={"100%"} mb={"4"}>
                                    Add Category
                                </AddButton>

                                <Box mt={"10px"} mb={"30px"}>
                                    <SearchInput placeholder="category name or id"
                                                 findFromInput={findCategories}/>
                                </Box>

                                <DeleteCategoryModal id={categoryIdToDelete} name={categoryNameToDelete}
                                                     isOpen={isOpen}
                                                     onClose={onClose}/>
                                {selectedTab == 2 ? (
                                        <InfiniteScroll
                                            dataLength={partCategories.length}
                                            next={loadMoreCategories}
                                            hasMore={hasMoreCategories}
                                            loader={<h4>Loading...</h4>}
                                            endMessage={
                                                <p style={{textAlign: 'center'}}>
                                                    <b>No more categories!</b>
                                                </p>
                                            }
                                        >
                                            {categories}
                                        </InfiniteScroll>
                                    )
                                    :
                                    (
                                        <></>
                                    )}

                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            )}

        </Box>
    );
}