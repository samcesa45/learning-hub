"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshContacts = exports.searchContacts = exports.updateContact = exports.listContacts = exports.addContact = void 0;
const contact_1 = __importDefault(require("../../models/contact"));
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { name, phone, email } = req.body;
    yield contact_1.default.create({
        userId,
        name,
        phone,
        email
    });
    res.json({ message: 'Contact added successfully' });
});
exports.addContact = addContact;
const listContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const contacts = yield contact_1.default.find({ userId });
        res.json({ data: contacts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch contact lists' });
    }
});
exports.listContacts = listContacts;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, phone, email } = req.body;
    try {
        yield contact_1.default.findByIdAndUpdate({ id, userId }, { name, phone, email });
        res.json({ message: 'Contact updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update contacts' });
    }
});
exports.updateContact = updateContact;
const searchContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const query = req.query.query;
    try {
        const contacts = yield contact_1.default.find({
            userId,
            name: { $regex: query, $options: 'i' }
        });
        res.json({ data: contacts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to search contacts' });
    }
});
exports.searchContacts = searchContacts;
const refreshContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const refreshedContacts = yield contact_1.default.find({ userId })
            .sort({ updatedAt: -1 });
        res.json({
            message: 'Contacts refreshed successfully',
            contacts: refreshedContacts
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to refresh contacts' });
    }
});
exports.refreshContacts = refreshContacts;
