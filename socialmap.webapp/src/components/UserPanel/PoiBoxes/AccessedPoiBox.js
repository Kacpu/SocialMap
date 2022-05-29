import {Badge, Button, Text} from "@chakra-ui/react";
import BasePoiBox from "./BasePoiBox";
import React from "react";
import {BsFillPeopleFill} from "react-icons/bs";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import WrapText from "../../Elems/WrapText";
import useOpenStatus from "../../../hooks/useOpenStatus";
import DeleteAccessToPoiModal from "../../Modals/DeleteAccessToPoiModal";

export default function AccessedPoiBox(props) {
    const navigate = useNavigate();
    const { isOpen: isOpenRemoveModal, onOpen: onOpenRemoveModal, onClose: onCloseRemoveModal } = useOpenStatus();

    const onDetails = () => {
        navigate(`/point/${props.poiData.id}`, {state: {beforeSite: "/profile/#accessedPointsTab"}});
    }

    const onRemove = () => {
        onOpenRemoveModal();
    }

    let badges = [
        <Badge key={0} colorScheme={"yellow"} mr={"2"}>
            Accessed
        </Badge>
    ];

    badges = badges.concat(props.poiData.categories.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    const centerFooter = <React.Fragment>
        <Text mr={2} color={"gray.300"} fontWeight={"semibold"}>
            Shared by:
        </Text>
        <BsFillPeopleFill/>
        <WrapText ml={1} color={"gray.200"} fontWeight={"semibold"}>
            {props.poiData.creatorName}
        </WrapText>
    </React.Fragment>;

    const leftButtons = [
        <Button key={1} variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} onClick={onDetails}>
            Details
        </Button>
    ];

    const rightButtons = [
        <Button variant={"outline"} borderColor={"red.400"} color={"red.400"}
                _hover={{bg: "rgba(225,116,116,0.12)"}} fontSize={16} key={2} onClick={onRemove}>
            Remove
        </Button>
    ];

    return (
        <React.Fragment>
            <BasePoiBox
                poiData={props.poiData}
                badges={badges}
                leftButtons={leftButtons}
                rightButtons={rightButtons}
                centerFooter={centerFooter}
            />
            {isOpenRemoveModal &&
                <DeleteAccessToPoiModal
                    id={props.poiData.id}
                    name={props.poiData.name}
                    action={"remove"}
                    issuerName={props.poiData.creatorName}
                    isOpen={isOpenRemoveModal}
                    onClose={onCloseRemoveModal}
                    onAccessToPoiDelete={props.onAccessedPointDelete}
                />
            }
        </React.Fragment>
    );
}