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
    const [loading, setLoading] = useState(true);

    const [categoryIdToDelete, setCategoryIdToDelete] = useState(undefined);
    const [categoryNameToDelete, setCategoryNameToDelete] = useState(undefined);

    const [pointIdToManage, setPointIdToManage] = useState(undefined);
    const [pointNameToManage, setPointNameToManage] = useState(undefined);

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {hash} = useLocation();
    const [textInput, setTextInput] = useState();

    const [selectedTab, setSelectedTab] = useState(0);

    const [pointsToAcceptCounter, setPointsToAcceptCounter] = useState(1);
    const [hasMorePointsToAccept, setHasMorePointsToAccept] = useState(true);
    const [allPointsToAccept, setAllPointsToAccept] = useState([]);
    const [allFilteredPointsToAccept, setAllFilteredPointsToAccept] = useState([]);
    const [partPointsToAccept, setPartPointsToAccept] = useState([]); //initialLoadPointsToAccept

    const [pointsCounter, setPointsCounter] = useState(1);
    const [hasMorePoints, setHasMorePoints] = useState(true);
    const [allPoints, setAllPoints] = useState([]);
    const [allFilteredPoints, setAllFilteredPoints] = useState([]);
    const [partPoints, setPartPoints] = useState([]);

    const [categoriesCounter, setCategoriesCounter] = useState(1);
    const [hasMoreCategories, setHasMoreCategories] = useState(true);
    const [allCategories, setAllCategories] = useState([]);
    const [allFilteredCategories, setAllFilteredCategories] = useState([]);
    const [partCategories, setPartCategories] = useState([]); //initialLoadCategories

    const elemPerLoad = 10;

    function initialLoad(ctr, arr) {
        let from = 0;
        let to = ctr * 10;
        let points = arr.slice(from, to);
        return points;
    }

    function initialLoadCategories(data) {
        return initialLoad(categoriesCounter, data)
    }

    function initialLoadPoints(data) {
        return initialLoad(pointsCounter, data);
    }

    function initialLoadPointsToAccept(data) {
        return initialLoad(pointsToAcceptCounter, data);
    }

    useEffect(() => {

        let index = 0;
        if(hash){
            index = focusOnName(hash);
        }
        setSelectedTab(index);

        //load data from API
        if (index == 0) {
            let points = POIToAcceptMock;
            setAllPointsToAccept(points);
            setPartPointsToAccept(initialLoadPointsToAccept(points));
        } else if(index ==1){
            let allPoints = POIToAcceptMock;
            setAllPoints(allPoints);
            setPartPoints(initialLoadPoints(allPoints));
        } else if (index == 2) {
            let categories = categoryToAcceptMock;
            setAllCategories(categories);
            setPartCategories(initialLoadCategories(categories))
        }
        setLoading(false);
    }, [])

    function loadMoreCategories() {
        if (hasMoreCategories) {
            let lookedCategories;
            if (allFilteredCategories.length == 0) {
                lookedCategories = allCategories;
            } else {
                lookedCategories = allFilteredCategories;
            }
            let from = categoriesCounter * elemPerLoad;
            let to = (categoriesCounter + 1) * elemPerLoad;
            let categories = lookedCategories.slice(from, to);
            setCategoriesCounter(categoriesCounter + 1);
            setPartCategories([...partCategories, ...categories]);
            if (to > lookedCategories.length) {
                setHasMoreCategories(false);
            }
        }
    }
    function loadMorePoints(){
        let lookedPoints;
        if (allFilteredPoints.length == 0) {
            lookedPoints = allPoints;
        } else {
            lookedPoints = allFilteredPoints;
        }
        let from = pointsCounter * elemPerLoad;
        let to = (pointsCounter + 1) * elemPerLoad;
        let points = lookedPoints.slice(from, to);
        setPointsCounter(pointsCounter + 1);
        setPartPoints([...partPoints, ...points]);
        if (to > lookedPoints.length) {
            setHasMorePoints(false);
        }
    }

    function loadMorePointsToAccept() {
        let lookedPoints;
        if (allFilteredPointsToAccept.length == 0) {
            lookedPoints = allPointsToAccept;
        } else {
            lookedPoints = allFilteredPointsToAccept;
        }
        let from = pointsToAcceptCounter * elemPerLoad;
        let to = (pointsToAcceptCounter + 1) * elemPerLoad;
        let points = lookedPoints.slice(from, to);
        setPointsToAcceptCounter(pointsToAcceptCounter + 1);
        setPartPointsToAccept([...partPointsToAccept, ...points]);
        if (to > lookedPoints.length) {
            setHasMorePointsToAccept(false);
        }
    }

    function handleInputChange(event) {
        setTextInput(event.target.value);
        console.log(event.target.value);
    }

    function findCategories(inputValue) {
        let newCategories = []
        for (const elem of allCategories) {
            if (elem.Name.toLowerCase().includes(inputValue)) {
                newCategories.push(elem);
            } else if (elem.Id == inputValue) {
                newCategories.push(elem);
            }
        }
        setAllFilteredCategories(newCategories);
        setPartCategories(initialLoad(1, newCategories));
        setCategoriesCounter(1);
        if(newCategories.length != 0) {
            setHasMoreCategories(true);
        }
        else{
            setHasMoreCategories(false);
        }
    }

    function findPoints(inputValue) {
        let newPoints = [];
        for (const elem of allPoints) {
            if (elem.Name.toLowerCase().includes(inputValue)) {
                newPoints.push(elem);
            } else if (elem.Id == inputValue) {
                newPoints.push(elem);
            }
        }
        setAllFilteredPoints(newPoints);
        setPartPoints(initialLoad(1, newPoints));
        setPointsCounter(1);
        if(newPoints.length != 0){
            setHasMorePoints(true);
        }
        else{
            setHasMorePoints(false);
        }
    }

    function findPointsToAccept(inputValue) {
        let newPoints = [];
        for (const elem of allPointsToAccept) {
            if (elem.Name.toLowerCase().includes(inputValue)) {
                newPoints.push(elem);
            } else if (elem.Id == inputValue) {
                newPoints.push(elem);
            }
        }
        setAllFilteredPointsToAccept(newPoints);
        setPartPointsToAccept(initialLoad(1, newPoints));
        setPointsToAcceptCounter(1);
        if(newPoints.length != 0){
            setHasMorePointsToAccept(true);
        }
        else{
            setHasMorePointsToAccept(false);
        }
    }

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
                                           w={"100%"}>
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