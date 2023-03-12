/* eslint-disable  import/no-default-export */
import $api from ".";

interface FetchBook {
    bookId: string
}

export default class UserService {
    static async fetchBooks() {
        return $api.get("https://strapi.cleverland.by/api/books")
    }

    static async fetchCategories() {
        return $api.get("https://strapi.cleverland.by/api/categories")
    }

    static async fetchBook({ bookId }: FetchBook) {
        return $api.get(`https://strapi.cleverland.by/api/books/${bookId}`)
    }
}