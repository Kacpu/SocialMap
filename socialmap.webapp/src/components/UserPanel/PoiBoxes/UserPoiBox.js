import {Badge, Button} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import BasePoiBox from "./BasePoiBox";
import SharePoiModal from "../../Modals/SharePoiModal";
import useOpenStatus from "../../../hooks/useOpenStatus";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import DeletePoiModal from "../../Modals/DeletePoiModal";
import ChangePoiStatusModal from "../../Modals/ChangePoiStatusModal";

export default function UserPoiBox(props) {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    const { isOpen: isOpenShareModal, onOpen: onOpenShareModal, onClose: onCloseShareModal } = useOpenStatus();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useOpenStatus();
    const { isOpen: isOpenChangeStatusModal, onOpen: onOpenChangeStatusModal, onClose: onCloseChangeStatusModal } = useOpenStatus();

    useEffect(() => {
        if (props.poiData.isAccepted === true && props.poiData.isGlobal === true) {
            setStatus("public");
        } else if (props.poiData.isAccepted === false && props.poiData.isGlobal === true) {
            setStatus("waiting for acceptance");
        } else {
            setStatus("private");
        }
    }, [])

    const handleShare = () => {
        onOpenShareModal();
    }

    const onEdit = () => {
        navigate("/editpoint", {state: {pointId: props.poiData.id, beforeSite: "/profile/#userPointsTab"}})
    }

    const onDelete = () => {
        onOpenDeleteModal();
    }

    const onChangeStatus = () => {
        onOpenChangeStatusModal();
    }

    const onDetails = () => {
        navigate(`/point/${props.poiData.id}`, {state: {beforeSite: "/profile/#userPointsTab"}});
    }

    const handleChangeStatus = () => {
        if (status === "public") {
            setStatus("private");
        } else if (status === "waiting for acceptance") {
            setStatus("private");
        } else if (status === "private") {
            setStatus("waiting for acceptance");
        }
    }

    function getChangeStatusActionName() {
        if (status === "public") {
            return "Make private";
        } else if (status === "waiting for acceptance") {
            return "Cancel request to publish";
        } else if (status === "private") {
            return "Send request to publish";
        }
    }

    let badges = [
        <Badge key={0} colorScheme={"yellow"} mr={"2"}>
            {status}
        </Badge>
    ];

    badges = badges.concat(props.poiData.categories.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    const leftButtons = [
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={1} onClick={onDetails}>
            Details
        </Button>,
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={2} onClick={handleShare}>
            Share
        </Button>,
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={3} onClick={onChangeStatus}>
            {getChangeStatusActionName()}
        </Button>
    ];

    const rightButtons = [
        <Button variant={"outline"} borderColor={"yellow.300"} color={"yellow.300"} mr={3}
                _hover={{bg: "rgba(241,231,136,0.12)"}} fontSize={16} key={1} onClick={onEdit}>
            Edit
        </Button>,
        <Button variant={"outline"} borderColor={"red.400"} color={"red.400"}
                _hover={{bg: "rgba(225,116,116,0.12)"}} fontSize={16} key={2} onClick={onDelete}>
            Delete
        </Button>
    ];

    return (
        <React.Fragment>
            <BasePoiBox
                poiData={props.poiData}
                badges={badges}
                leftButtons={leftButtons}
                rightButtons={rightButtons}
            />
            {isOpenShareModal &&
                <SharePoiModal
                    isOpen={isOpenShareModal}
                    onClose={onCloseShareModal}
                    poiData={props.poiData}
                />
            }
            {isOpenDeleteModal &&
                <DeletePoiModal
                    id={props.poiData.id}
                    name={props.poiData.name}
                    isOpen={isOpenDeleteModal}
                    onClose={onCloseDeleteModal}
                    onUserPointDelete={props.onUserPointDelete}
                />
            }
            {isOpenChangeStatusModal &&
                <ChangePoiStatusModal
                    id={props.poiData.id}
                    name={props.poiData.name}
                    status={status}
                    changeStatusActionName={getChangeStatusActionName()}
                    isOpen={isOpenChangeStatusModal}
                    onClose={onCloseChangeStatusModal}
                    onChangeStatus={handleChangeStatus}
                />
            }
        </React.Fragment>
    );
}