import express from "express";
const router = express.Router();
import { promises as fs } from "fs";
import orderBrands from "../functions.js";

const { readFile, writeFile } = fs;

router.get("/brandWithMostModels", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const brandWithMostModels = data.reduce((acc, brandData) => {
            if (brandData.models.length > acc[0].quantity) {
                acc = [{
                    brand: brandData.brand,
                    quantity: brandData.models.length
                }]
            } else if (brandData.models.length === acc[0].quantity) {
                acc.push({
                    brand: brandData.brand,
                    quantity: brandData.models.length
                })
            }

            return acc;

        }, [{
            brand: null,
            quantity: 0
        }]);
        res.send(brandWithMostModels);

    } catch (error) {
        next(error)
    }
});

router.get("/brandWithLeastModels", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const brandWithMostModels = data.reduce((acc, brandData) => {
            if (brandData.models.length < acc[0].quantity) {
                acc = [{
                    brand: brandData.brand,
                    quantity: brandData.models.length
                }]
            } else if (brandData.models.length === acc[0].quantity) {
                acc.push({
                    brand: brandData.brand,
                    quantity: brandData.models.length
                })
            }
            return acc;

        }, [{
            brand: null,
            quantity: Infinity
        }]);
        res.send(brandWithMostModels);

    } catch (error) {
        next(error)
    }
})

router.get("/branchsWithMostModelsOrderByNumber/:quantity", async (req, res, next) => {
    try {
        const quantity = req.params.quantity;
        const data = JSON.parse(await readFile(global.fileName));
        const orderedArray = data.sort(orderBrands("asc"));
        const branchsWithMostModelsOrderByNumber = orderedArray.slice(0, quantity);
        const formatedBranchsWithMostModelsOrderByNumber = branchsWithMostModelsOrderByNumber.map(item => {
            return {
                "brand": item.brand,
                quantity: item.models.length
            }
        })
        res.send(formatedBranchsWithMostModelsOrderByNumber);

    } catch (error) {
        next(error)
    }
})

router.get("/branchsWithLeastModelsOrderByNumber/:quantity", async (req, res, next) => {
    try {
        const quantity = req.params.quantity;
        const data = JSON.parse(await readFile(global.fileName));
        const orderedArray = data.sort(orderBrands("desc"));
        const branchsWithMostModelsOrderByNumber = orderedArray.slice(0, quantity);
        const formatedBranchsWithMostModelsOrderByNumber = branchsWithMostModelsOrderByNumber.map(item => {
            return {
                "brand": item.brand,
                quantity: item.models.length
            }
        })
        res.send(formatedBranchsWithMostModelsOrderByNumber);

    } catch (error) {
        next(error)
    }
})

router.post("/searchBybrand", async (req, res, next) => {
    try {

        const brandToSearch = req.body.nomeMarca.toLocaleLowerCase();
        const data = JSON.parse(await readFile(global.fileName));
        const brand = data.find(item => item.brand.toLocaleLowerCase() === brandToSearch);
        if (!brand) {
            res.send([]);
        }
        res.send(brand.models);

    } catch (error) {
        next(error)
    }
})






router.use((err, req, res, next) => {

    console.log(err);
    res.status(400).send({ error: err.message });
})




export default router;