// prisma/simpleData.ts

export const usersData = [
  {
    id: "user1",
    email: "alice@example.com",
    name: "Alice",
    passwordHash: "hashedpassword1",
  },
  {
    id: "user2",
    email: "bob@example.com",
    name: "Bob",
    passwordHash: "hashedpassword2",
  },
];

export const booksData = [
  {
    id: "book1",
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world.",
    coverUrl: "/2.jpg",
    pageCount: 304,
    genre: "Productivity",
    isFeatured: true,
  },
  {
    id: "book2",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones.",
    coverUrl: "/h.jpg",
    pageCount: 320,
    genre: "Self-help",

    isFeatured: false,
  },
  {
    id: "book3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    description: "Your journey to mastery in software development.",
    coverUrl: "/3.jpg",
    pageCount: 352,
    genre: "Programming",
    isFeatured: false,
  },

  {
    id: "book4",
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A Handbook of Agile Software Craftsmanship.",
    coverUrl: "/4.jpg",
    pageCount: 464,
    genre: "Programming",
    isFeatured: false,
  },
  {
    id: "book5",
    title: "Refactoring",
    author: "Martin Fowler",
    description: "Improving the design of existing code.",
    coverUrl: "/5.jpg",
    pageCount: 448,
    genre: "Programming",
    isFeatured: false,
  },
];

export const bookTrackingsData = [
  {
    userId: "user1",
    bookId: "book1",
    status: "READING",
    currentPage: 50,
    rating: 5,
    notes: "Taking notes on deep focus.",
    startedAt: new Date("2025-07-01"),
  },
  {
    userId: "user1",
    bookId: "book2",
    status: "WANT_TO_READ",
    currentPage: 0,
  },
  {
    userId: "user2",
    bookId: "book2",
    status: "READING",
    currentPage: 120,
    rating: 4,
    notes: "Practical advice.",
    startedAt: new Date("2025-07-05"),
  },
  {
    userId: "user2",
    bookId: "book3",
    status: "FINISHED",
    currentPage: 352,
    rating: 5,
    notes: "Must-read for devs.",
    startedAt: new Date("2025-06-01"),
    finishedAt: new Date("2025-07-01"),
  },
];

export const reviewsData = [
  {
    userId: "user1",
    bookId: "book1",
    rating: 5,
    content: "Incredible book on focus and productivity.",
  },
  {
    userId: "user2",
    bookId: "book3",
    rating: 5,
    content: "Essential for every programmer.",
  },
];
