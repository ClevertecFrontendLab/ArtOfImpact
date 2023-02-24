export type BookFetch = {
    bookId: string;
}

export interface ContentSliceState {
    content: IContent[],
    book: IBook,
    status: string;
    isOpenMenu: boolean;
    countBooks: CountBooks[];
    sort: boolean,
    search: '',
}

export type IContent = {
    authors: string[],
    booking: BookingBook | null,
    categories: string[],
    delivery: null | any,
    histories: HistoriesBook[] | null,
    id: number,
    image: ImageContent | null,
    issueYear: string,
    rating: number,
    title: string
}

export type ImageContent = {
    url: string
}

export type IBook = {
    ISBN: string,
    authors: string[],
    booking: BookingBook | null,
    categories: string[],
    comments: CommentsBook[] | null,
    cover: string,
    delivery: null | any,
    description: string,
    format: string,
    histories: HistoriesBook[] | null,
    images: ImagesBook[] | null,
    id: number,
    issueYear: string,
    pages: string,
    producer: string,
    publish: string,
    rating: number | null,
    title: string,
    weight: string
}

export type ImagesBook = {
    url: string,
}

export type CommentsBook = {
    id: number, rating: number, text: string, createdAt: string, user: { commentUserId: number, firstName: string, lastName: string, avatarUrl: string | null }
}
export type BookingBook = {
    customerFirstName: string, customerId: number, customerLastName: string, dateOrder: string, id: number, order: boolean
}
export type HistoriesBook = {
    id: number, userId: number
}
export type CountBooks = {
    count: number, path: string, id: number, name: string
}