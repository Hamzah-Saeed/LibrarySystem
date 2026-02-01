import { FastifyInstance } from "fastify";

interface UserBook {
    id: number;
    userId: string;
    bookId: string;
    status: "reading" | "completed" | "want to read";
    addedAt: Date;
}

const userBooks: UserBook[] = [];
let nextId = 1;

export async function userBooksRoutes(app: FastifyInstance) {
    // Add a book to the user's reading list
    app.post("/user-books", async (request, reply) => {
        const { userId, bookId, status } = request.body as any;
        if (!userId || !bookId || !status) {
            reply.status(400).send({ error: "Missing required fields" });   //theres an error
            return;
        }
        const newUserBook: UserBook = {
            id: nextId++,
            userId,
            bookId,
            status,
            addedAt: new Date()
        };
        userBooks.push(newUserBook);
        return reply.code(201).send(newUserBook);   //it works
    })

    // Get all books in a user's reading list for testing purposes
    app.get("/user-books", async () => {
        return userBooks;
    });
};