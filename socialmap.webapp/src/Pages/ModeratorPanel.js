import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, Stack, Heading } from '@chakra-ui/react'
import PointToAccept from "../components/PointToAccept";
export default function ModeratorPanel() {

    const boxColor = useColorModeValue('gray.600', 'gray.700');

    return (
        <div>
            <Stack alignItems={'center'} mt={8}>
                <Heading fontSize={30} textAlign={'center'}>Moderator's Panel</Heading>
            </Stack>
            <Box bgColor={boxColor} mt={8} ml={20} mr={20} rounded={'lg'}>
                <Tabs>
                    <TabList>
                        <Tab>Accept Points</Tab>
                        <Tab>Add Category</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Stack spacing={5}>
                                <PointToAccept
                                    id={'1431'}
                                    name={'zabawny punkt'} />
                                
                                <PointToAccept
                                    id={'2331'}
                                    name={'sdfsny punkt'} />
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <p>Category</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </div>
    );
}