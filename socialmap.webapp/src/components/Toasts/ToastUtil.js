
function constructCom(action, item,extra){
    let prepAction = action.charAt(0).toLowerCase() + action.slice(1);
    let preItem = item.charAt(0).toUpperCase() + item.slice(1);
    return preItem + " " + prepAction + "! " + extra;
}

const constructTitle = (action) =>{
    return action.charAt(0).toUpperCase() + action.slice(1);
}

//musisz zainicjowac useToast w kompnencie i tutaj przekazać!
//const toast = useToast();

function successToast(toast, action, item, extraPhrase = ""){
    return(
    toast({
        title: "Success!",
        description: constructCom(action, item, extraPhrase),
        status: 'success',
        duration: 4000,
        isClosable: true,
    })
    );
}

function errorToast(toast){
    return(
        toast({
            title: "Error!",
            description: `Something went wrong. Try again later`,
            status: 'error',
            duration: 4000,
            isClosable: true,
        })
    )
}

export {successToast, errorToast}