import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

// Multiple notes
export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    
    try {
        assertIsDefined(authenticatedUserId);   // security feature that this is defined
        const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(notes);    // HTTP 200 "Good"
    } catch (error) {
        next(error);
    }
};

// One note
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);   // security feature that this is defined

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");     // HTTP 400 "Bad Request"
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");    // HTTP 404 "Not found"
        }

        if (!note.userId?.equals(authenticatedUserId)) { // check this
            throw createHttpError(401, "You cannot access this note");
        }

        res.status(200).json(note);     // HTTP 200 "Good"
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);   // security feature that this is defined

        if (!title) {
            throw createHttpError(400, "Note must have a title");     // HTTP 400 "Bad Request"
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title, 
            text: text,
        }); // sends an exec by default, no need to append

        res.status(201).json(newNote);  // HTTP 201 "New resource created"
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;
    
    try {
        assertIsDefined(authenticatedUserId);
        
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");     // HTTP 400 "Bad Request"
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");     // HTTP 400 "Bad Request"
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");    // HTTP 404 "Not found"
        }

        if (!note.userId?.equals(authenticatedUserId)) { // check this
            throw createHttpError(401, "You cannot access this note");
        }
        
        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);  // HTTP 200 "Good"

    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");     // HTTP 400 "Bad Request"
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");      // HTTP 404 "Not found"
        }

        if (!note.userId?.equals(authenticatedUserId)) { // check this
            throw createHttpError(401, "You cannot access this note");
        }

        await NoteModel.findByIdAndDelete(noteId).exec();

        res.sendStatus(204);    // HTTP 204 "Deletion successful"
        // We use sendStatus because status does not send a response, JSON send the response
        // We don't have a JSON body when we delete this note
        // Whenever you don't use .json, sendStatus() instead

    } catch (error) {
        next(error);
    }
};