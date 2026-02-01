import { FastifyInstance } from "fastify";

interface Book {
    id: string;
    title: string;
    authors: string[];
    source: string;
    source_id: string;
}

//mock database for testing purposes, to be integrated with a library of books
const books: Book[] = [
    { id: "1", title: "The Great Gatsby", authors: ["F. Scott Fitzgerald"], source: "mockSource", source_id: "lib-123" },
    { id: "2", title: "1984", authors: ["George Orwell"], source: "mockSource", source_id: "lib-456" }
];

//users asks for a certain book, method searches for that book in the mock database and returns results
export async function booksRoutes(app: FastifyInstance) {
    app.get("/books/search", async (request, reply) => {
        const query = (request.query as any).q || "";
        const results = books.filter(b =>
            b.title.toLowerCase().includes(query) || "");
        return results;
    })
};