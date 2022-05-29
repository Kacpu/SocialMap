import {Badge, Button, Text, useToast} from "@chakra-ui/react";
import BasePoiBox from "./BasePoiBox";
import React, {useState} from "react";
import {BsFillPeopleFill} from "react-icons/bs";
import {Link as RouterLink} from "react-router-dom";
import WrapText from "../../Elems/WrapText";
import useOpenStatus from "../../../hooks/useOpenStatus";
import DeleteAccessToPoiModal from "../../Modals/DeleteAccessToPoiModal";
import {getPoiAccessesForUser, updatePoiAccess} from "../../../socialMapApi/poiAccessRequests";
import {errorToast, successToast} from "../../Toasts/ToastUtil";

export default function InvitationBoiBox(props) {
    const [isLoading, setIsLoading] = useState(false);
    const {isOpen: isOpenRejectModal, onOpen: onOpenRejectModal, onClose: onCloseRejectModal} = useOpenStatus();
    const toast = useToast()

    const onAccept = async () => {
        setIsLoading(true);
        const accessId = await getPoiAccessId();
        if(accessId !== null) {
            const res = await updatePoiAccess(accessId, {isAccepted: true});
            if (res?.ok) {
                successToast(toast, null, null,null,
                    "Accepted invitation to point " + props.poiData.name + "!");
                props.onInvitationPointDelete(props.poiData.id);
            } else {
                errorToast(toast)
            }
        } else {
            errorToast(toast)
        }
    }

    async function getPoiAccessId() {
        const res = await getPoiAccessesForUser(null, props.poiData.id).catch(console.error);
        return res?.ok && res.data?.length > 0 ? res.data[0].id : null;
    }

    const onReject = () => {
        onOpenRejectModal();
    }

    let badges = [
        <Badge key={0} colorScheme={"yellow"} mr={"2"}>
            Invitation
        </Badge>
    ];

    badges = badges.concat(props.poiData.categories.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    const centerFooter = <React.Fragment>
        <Text mr={2} color={"gray.300"} fontWeight={"semibold"}>
            Invited by:
        </Text>
        <BsFillPeopleFill/>
        <WrapText ml={1} color={"gray.200"} fontWeight={"semibold"}>
            {props.poiData.creatorName}
        </WrapText>
    </React.Fragment>;

    const leftButtons = [
        <Button ml={2} variant={"outline"} borderColor={"green.400"} color={"green.400"} isLoading={isLoading}
                _hover={{bg: "rgba(62,131,41,0.12)"}} fontSize={16} mr={3} key={1} onClick={onAccept}>
            Accept
        </Button>,
        <Button variant={"outline"} borderColor={"red.400"} color={"red.400"}
                _hover={{bg: "rgba(225,116,116,0.12)"}} fontSize={16} key={2} onClick={onReject}>
            Reject
        </Button>
    ];

    const rightButtons = [
        <Button as={RouterLink} to={`/point/${props.poiData.id}`}
                variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={1}>
            Details
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
                mapButtonOnLeft={false}
            />
            {isOpenRejectModal &&
                <DeleteAccessToPoiModal
                    id={props.poiData.id}
                    name={props.poiData.name}
                    action={"reject"}
                    issuerName={props.poiData.creatorName}
                    isOpen={isOpenRejectModal}
                    onClose={onCloseRejectModal}
                    onAccessToPoiDelete={props.onInvitationPointDelete}
                />
            }
        </React.Fragment>
    );
}