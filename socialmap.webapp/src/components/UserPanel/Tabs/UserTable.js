import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import UserPointsTabPanel from "./UserPointsTabPanel";
import AccessedPointsTabPanel from "./AccessedPointsTabPanel";
import InvitationPointsTabPanel from "./InvitationPointsTabPanel";
import {useLocation} from "react-router-dom";

export default function UserTable() {
    const {hash} = useLocation();
    const boxColor = useColorModeValue('gray.600', 'gray.700');

    function focusOnName(name){
        switch (name) {
            case "#userPointsTab":
                return 0;
            case "#accessedPointsTab":
                return 1;
            case "#invitationPointsTab":
                return  2;
            default:
                return 0;
        }
    }

    return (
        <Box width={'80vw'} bgColor={boxColor} mt={8} rounded={'lg'}>
            <Tabs isLazy defaultIndex={focusOnName(hash)}>
                <TabList>
                    <Tab>Your Points</Tab>
                    <Tab>Accessed Points</Tab>
                    <Tab>Invitation Points</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UserPointsTabPanel/>
                    </TabPanel>

                    <TabPanel>
                        <AccessedPointsTabPanel/>
                    </TabPanel>

                    <TabPanel>
                        <InvitationPointsTabPanel/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}