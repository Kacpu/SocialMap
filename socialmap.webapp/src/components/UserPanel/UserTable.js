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
import {getPoisForUser} from "../../socialMapApi/poiRequests";
import UserPoiBox from "./UserPoiBox";
import BaseTabPanel from "./BaseTabPanel";
import AccessedPoiBox from "./AccessedPoiBox";
import InvitationBoiBox from "./InvitationBoiBox";

export default function UserTable(){
    const boxColor = useColorModeValue('gray.600', 'gray.700');

    const fetchUserPoints = async (signal) => {
        return await getPoisForUser(signal,true).catch(console.error);
    }

    const fetchAccessedPoints = async (signal) => {
        return await getPoisForUser(signal,false, true).catch(console.error);
    }

    const fetchInvitationPoints = async (signal) => {
        return await getPoisForUser(signal,false, false, true).catch(console.error);
    }

    const filterPoint = (list, input) => list.filter(x => x.name.toLowerCase().includes(input.toLowerCase()));

    const createUserPointComponentList = (dataList) => {
        return dataList.map((p) =>
            <React.Fragment key={p.id}>
                <UserPoiBox
                    poiData={p}
                />
                <Box height={0.5} border={'none'} bg={'gray.600'} opacity={0.5} my={3} boxShadow={'0 3px 10px -0.5px gray'}/>
            </React.Fragment>
        );
    }

    const createAccessedPointComponentList = (dataList) => {
        return dataList.map((p) =>
            <React.Fragment key={p.id}>
                <AccessedPoiBox
                    poiData={p}
                />
                <Box height={0.5} border={'none'} bg={'gray.600'} opacity={0.5} my={3} boxShadow={'0 3px 10px -0.5px gray'}/>
            </React.Fragment>
        );
    }

    const createInvitationPointComponentList = (dataList) => {
        return dataList.map((p) =>
            <React.Fragment key={p.id}>
                <InvitationBoiBox
                    poiData={p}
                />
                <Box height={0.5} border={'none'} bg={'gray.600'} opacity={0.5} my={3} boxShadow={'0 3px 10px -0.5px gray'}/>
            </React.Fragment>
        );
    }

    return (
        <Box width={'80vw'} bgColor={boxColor} mt={8} rounded={'lg'}>
            <Tabs isLazy>
                <TabList>
                    <Tab>Your Points</Tab>
                    <Tab>Accessed Points</Tab>
                    <Tab>Invitation Points</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <BaseTabPanel
                            fetchData={fetchUserPoints}
                            searchPlaceholder={"point name"}
                            filterData={filterPoint}
                            createDataComponentList={createUserPointComponentList}
                        />
                    </TabPanel>

                    <TabPanel>
                        <BaseTabPanel
                            fetchData={fetchAccessedPoints}
                            searchPlaceholder={"point name"}
                            filterData={filterPoint}
                            createDataComponentList={createAccessedPointComponentList}
                        />
                    </TabPanel>

                    <TabPanel>
                        <BaseTabPanel
                            fetchData={fetchInvitationPoints}
                            searchPlaceholder={"point name"}
                            filterData={filterPoint}
                            createDataComponentList={createInvitationPointComponentList}
                        />
                    </TabPanel>

                </TabPanels>
            </Tabs>
        </Box>
    );
}