import { RequestHandler } from "express";
import NoteModel from "../models/note";

// Multiple notes
export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes); // HTTP 200 "Good"
    } catch (error) {
        next(error);
    }
};

// One note
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        const note = await NoteModel.findById(noteId).exec();
        res.status(200).json(note); // HTTP 200 "Good"
    } catch (error) {
        next(error);
    }
};

export const createNote: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newNote = await NoteModel.create({
            title: title, 
            text: text,
        }); // sends an exec by default, no need to append

        res.status(201).json(newNote); // HTTP 201 "New resource created"
    } catch (error) {
        next(error);
    }
};