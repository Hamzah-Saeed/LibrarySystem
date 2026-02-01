import Fastify from "fastify";
import { booksRoutes } from "./modules/books/books.routes";
import { userBooksRoutes } from "./modules/userBooks/userBooks.routes";

export function buildApp() {
    const app = Fastify({ logger: true });

    booksRoutes(app);
    userBooksRoutes(app);
    app.get("/health", async () => {
        return { status: "ok" };
    });

    return app;
}
