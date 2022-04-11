import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, Stack, Heading } from '@chakra-ui/react'
import PointToAccept from "../components/PointToAccept";
import { POIToAcceptMock } from '../mocks/POIToAcceptMock';
export default function ModeratorPanel() {

    const boxColor = useColorModeValue('gray.600', 'gray.700');

    //let points = POIToAcceptMock.map();
    console.log(POIToAcceptMock)

    const pointsToAccept = POIToAcceptMock.map((obj) =>
        <PointToAccept
        id= {obj.Id}
        name = {obj.Name} 
        author = {obj.Author}
        category= {obj.Category}
        x={obj.X}
        y={obj.Y}
        description={obj.description}
        />
    );

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems='center' mb={20}>
            <Stack alignItems={'center'} mt={8}>
                <Heading fontSize={30} textAlign={'center'}>Moderator's Panel</Heading>
            </Stack>
            <Box width={'90vw'} bgColor={boxColor} mt={8} rounded={'lg'}>
                <Tabs>
                    <TabList>
                        <Tab>Accept Points</Tab>
                        <Tab>Existed Points</Tab>
                        <Tab>Add Category</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Stack spacing={5}>
                                {pointsToAccept}
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <p>Existed Points</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Category</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
}