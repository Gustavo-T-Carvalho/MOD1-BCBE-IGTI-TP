

function orderBrands(order) {
    switch (order) {
        case "asc":
            console.log("asc")
            return orderBrandsAsc;
        case "desc":
            console.log("desc")

            return orderBrandsDesc;
        default:
            throw new Error("Invalid order parameter")
    }
}


function orderBrandsAsc(a, b) {
    if (a.models.length > b.models.length) {
        return -1;
    }
    if (a.models.length < b.models.length) {
        return 1;
    }
    return orderByname(a, b);
}

function orderBrandsDesc(a, b) {
    if (a.models.length > b.models.length) {
        return 1;
    }
    if (a.models.length < b.models.length) {
        return -1;
    }
    return orderByname(a, b);
}


function orderByname(a, b) {
    if (a.brand > b.brand) {
        return 1;
    }
    if (a.brand < b.brand) {
        return -1;
    }
    return 0;
}

export default orderBrands;



