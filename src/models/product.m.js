const db = require('../utils/db');
const tbName = "SanPham";

module.exports = class Product {
    constructor(MaSP, Ten, DonGia, SoLuongTon, Anh, MaLoai) {
        this.MaSP = MaSP;
        this.Ten = Ten;
        this.DonGia = DonGia;
        this.SoLuongTon = SoLuongTon;
        this.Anh = Anh;
        this.MaLoai = MaLoai;
    }
    static async insert(product) {
        return db.insertWithoutID(tbName, product);
    }
    static async getProduct(id) {
        return db.select(tbName, "MaSP", id);
    }
    static async getAll() {
        return db.selectAll(tbName);
    }
    static async getAllBy(orderBy, isDesc) {
        return db.selectAllBy(tbName, orderBy, isDesc);
    }
    static async getBy(type) {
        return db.joinTB(tbName, "Loai", "MaLoai", "TenLoai", type);
    }
    static async getBy(type, orderBy, isDesc) {
        return db.joinTB(tbName, "Loai", "MaLoai", "MaLoai", "TenLoai", type, orderBy, isDesc, null);
    }
    // get product with type id
    static async getSimilar(typeID, productID) {
        const query = `SELECT * FROM
        "${tbName}" JOIN "Loai" ON "${tbName}"."MaLoai" = "Loai"."MaLoai"
        WHERE "${tbName}"."MaLoai" = ${typeID} AND "MaSP" <> ${productID}`;
        return db.selectByQuery(query);
    }
    static async getType() {
        return db.selectAll("Loai");
    }
    static async getSearch(input) {
        return db.searchAll(tbName, input);
    }
    static async getByWithSearch(type, orderBy, isDesc, input) {
        return db.joinTBSearch(tbName, "Loai", "MaLoai", "MaLoai", "TenLoai", type, orderBy, isDesc, null, input);
    }
}