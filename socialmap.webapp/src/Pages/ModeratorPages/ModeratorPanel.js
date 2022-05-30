import {Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, Stack, Heading, Button} from '@chakra-ui/react'
import {useLocation} from "react-router-dom"
import {useEffect, useState} from 'react';
import CategoryTabPanel from "../../components/Moderator/CategoryTabPanel";
import PointsToAcceptTabPanel from "../../components/Moderator/PointsToAcceptTabPanel";
import GlobalPointsTabPanel from "../../components/Moderator/GlobalPointsTabPanel";

export default function ModeratorPanel() {
    const [loading, setLoading] = useState(false);
    const {hash} = useLocation();
    const boxColor = useColorModeValue('gray.600', 'gray.700');

    //const [pointIdToManage, setPointIdToManage] = useState(undefined);
    //const [pointNameToManage, setPointNameToManage] = useState(undefined);
    //const [selectedTab, setSelectedTab] = useState(0);

    function switchTab(id) {
        // let usedData;
        // switch (id) {
        //     case 0:
        //         if (fetchedPointsToAccept.length === 0) {
        //         } else {
        //         }
        //         break;
        //
        //     case 1:
        //         if (fetchedGlobalPoints.length === 0) {
        //         } else {
        //         }
        //
        //         break;
        //
        //     case 2:
        //         if (fetchedCategories.length === 0) {
        //         } else {
        //         }
        //         break;
        // }
        // setSelectedTab(id);
    }

    function focusOnName(name){
        let index = 0;
        switch (name) {
            case "#categories":
                index = 2;
                break;
            case "#pointsToAccept":
                index = 0;
                break;
            case "#globalPoints":
                index = 1;
                break;
            default:
                index = 0;
                break;
        }
        return index;
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
                    <Tabs isLazy defaultIndex={focusOnName(hash)}>
                        <TabList>
                            <Tab onClick={() => switchTab(0)}>Accept Points</Tab>
                            <Tab onClick={() => switchTab(1)}>Global Points</Tab>
                            <Tab onClick={() => switchTab(2)}>Categories</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <PointsToAcceptTabPanel/>
                            </TabPanel>
                            <TabPanel>
                                <GlobalPointsTabPanel/>
                            </TabPanel>
                            <TabPanel>
                                <CategoryTabPanel/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            )}
        </Box>
    );
}