const createComment = {
    poiId: 0,
    content: ""
}

const updateCommentSchema = {
    content: ""
}

const createCategory = {
    name: ""
}

const updateCategory = {
    name: ""
}

const createPoi = {
    name: "",
    x: 0,
    y: 0,
    description: "",
    isGlobal: false,
    categoriesId: []
}

const updatePoi = {
    name: "",
    x: null,
    y: null,
    description: "",
    isGlobal: null,
    isAccepted: null,
    categoriesId: []
}

const poiResponse = {
    id: 0,
    name: "",
    x: 0.0,
    y: 0.0,
    description: "",
    isGlobal: false,
    isAccepted: false,
    creatorId: 0,
    creatorName: "",
    likesNumber: 0,
    categories: []
}

const createPoiAccess = {
    poiId: 0,
    invitedUserId: 0
}

const updatePoiAccess = {
    isAccepted: null
}

const createLike = {
    poiId: 0,
}

const userResponse = {
    userName: "",
    email: ""
}

export {
    createComment,
    updateCommentSchema,
    createCategory,
    updateCategory,
    createPoi,
    updatePoi,
    poiResponse,
    createPoiAccess,
    updatePoiAccess,
    createLike
}