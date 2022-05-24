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
import {getPoisForUser} from "../socialMapApi/poiRequests";
import BaseTabPanel from "../components/UserPanel/BaseTabPanel";

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
        // switch (id) {
        //     case 0:
        //         if(allPointsToAccept.length == 0){
        //
        //         }
        //         else{
        //         }
        //         break;
        //
        //     case 1:
        //         if(allPoints.length == 0){
        //             //fetch from API
        //         }
        //         else{
        //         }
        //
        //         break;
        //
        //     case 2:
        //         if(allCategories.length == 0){
        //         }
        //         else{
        //         }
        //         break;
        // }
        //setSelectedTab(id);
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
    }

    const categories = (list) => {
        return list.map((obj) =>
            <CategoryModerator
                key={obj.Id}
                id={obj.Id}
                name={obj.Name}
                onOpen={onOpen}
                setCategoryIdToDelete={setCategoryIdToDelete}
                setCategoryNameToDelete={setCategoryNameToDelete}
            />
        );
    }

    const pointsToAccept = (list) => {
        return list.map((obj) =>
            <PointBox
                key={obj.Id}
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
    }

    const existingPoints = (list) => {
        return list.map((obj) =>
            <PointBox
                key={obj.Id}
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
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems='center' mb={20}>
            <Stack alignItems={'center'} mt={8}>
                <Heading fontSize={30} textAlign={'center'}>Moderator's Panel</Heading>
            </Stack>
            {loading ? (
                <Button isLoading={true}></Button>
            ) : (
                <Box width={'90vw'} bgColor={boxColor} mt={8} rounded={'lg'}>
                    <Tabs isLazy defaultIndex={() => focusOnName(hash)}>
                        <TabList>
                            <Tab onClick={() => switchTab(0)}>Accept Points</Tab>
                            <Tab onClick={() => switchTab(1)}>Existing Points</Tab>
                            <Tab onClick={() => switchTab(2)}>Categories</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <BaseTabPanel
                                    fetchData={fetchPointsToAccept}
                                    searchPlaceholder={"point name or id"}
                                    filterData={filter}
                                    createDataComponentList={pointsToAccept}
                                />
                            </TabPanel>

                            <TabPanel>
                                <BaseTabPanel
                                    fetchData={fetchPoints}
                                    searchPlaceholder={"point name or id"}
                                    filterData={filter}
                                    createDataComponentList={existingPoints}
                                />
                            </TabPanel>

                            <TabPanel>

                                <AddButton as={RouterLink} to="/moderatorpanel/addcategory"
                                           w={"100%"} mb={"4"}>
                                    Add Category
                                </AddButton>

                                <DeleteCategoryModal id={categoryIdToDelete} name={categoryNameToDelete}
                                                     isOpen={isOpen}
                                                     onClose={onClose}/>
                                <BaseTabPanel
                                    fetchData={fetchCategories}
                                    searchPlaceholder={"category name or id"}
                                    filterData={filter}
                                    createDataComponentList={categories}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            )}
        </Box>
    );
}