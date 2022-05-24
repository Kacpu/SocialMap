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
import PoiBox from "./PoiBox";
import BaseTabPanel from "./BaseTabPanel";

export default function UserTable(){
    const boxColor = useColorModeValue('gray.600', 'gray.700');

    const fetchUserPoints = async () => {
        const res = await getPoisForUser(true).catch(console.error);
        if (res != null) {
            return res;
        }
    }

    const fetchAccessedPoints = async () => {
        const res = await getPoisForUser(false, true).catch(console.error);
        if (res != null) {
            return res;
        }
    }

    const fetchInvitationPoints = async () => {
        const res = await getPoisForUser(false, false, true).catch(console.error);
        if (res != null) {
            return res;
        }
    }

    const filterPoint = (list, input) => list.filter(x => x.name.toLowerCase().includes(input.toLowerCase()));

    const createUserPointComponentList = (dataList) => {
        return dataList.map((p) =>
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
                            createDataComponentList={createUserPointComponentList}
                        />
                    </TabPanel>

                    <TabPanel>
                        <BaseTabPanel
                            fetchData={fetchInvitationPoints}
                            searchPlaceholder={"point name"}
                            filterData={filterPoint}
                            createDataComponentList={createUserPointComponentList}
                        />
                    </TabPanel>

                </TabPanels>
            </Tabs>
        </Box>
    );
}