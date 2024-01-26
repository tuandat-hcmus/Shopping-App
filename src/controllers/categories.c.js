const Categories = require('../models/categories.m');

module.exports = {
    getCategories: async (req, res) => {
        try {
            const categories = await Categories.getType();
            res.json({ categories: categories });
        }
        catch (error) {
            console.log("getCategories error: ", error);
            res.json(false);
        }
    },

    updateCategories: async (req, res) => {
        try {
            const id = req.query.id;
            const newval = req.query.newval;
            if (await Categories.update(["MaLoai", "TenLoai"], [id, newval], id))
                res.json({ data: true });
            else
                res.json(false);
        }
        catch (error) {
            console.log("updateCategories error: ", error);
            res.json(false);
        }
    },

    deleteCategories: async (req, res) => {
        try {
            const id = req.query.id;
            if (await Categories.delete(id))
                res.json({data: true});
            else
                res.json(false);
        }
        catch (error) {
            console.log("deleteCategories error: ", error);
            res.json(false);
        }
    }
}