import { TrackingStatus } from "@/generated/prisma";

// // prisma/simpleData.ts

// export const usersData = [
//   {
//     id: "user1",
//     email: "alice@example.com",
//     name: "Alice",
//     passwordHash: "hashedpassword1",
//   },
//   {
//     id: "user2",
//     email: "bob@example.com",
//     name: "Bob",
//     passwordHash: "hashedpassword2",
//   },
// ];

// export const booksData = [
//   {
//     id: "book1",
//     title: "Deep Work",
//     author: "Cal Newport",
//     description: "Rules for focused success in a distracted world.",
//     coverUrl: "/2.jpg",
//     pageCount: 304,
//     genre: "Productivity",
//     isFeatured: true,
//   },
//   {
//     id: "book2",
//     title: "Atomic Habits",
//     author: "James Clear",
//     description: "An easy & proven way to build good habits & break bad ones.",
//     coverUrl: "/h.jpg",
//     pageCount: 320,
//     genre: "Self-help",

//     isFeatured: false,
//   },
//   {
//     id: "book3",
//     title: "The Pragmatic Programmer",
//     author: "Andrew Hunt, David Thomas",
//     description: "Your journey to mastery in software development.",
//     coverUrl: "/3.jpg",
//     pageCount: 352,
//     genre: "Programming",
//     isFeatured: false,
//   },

//   {
//     id: "book4",
//     title: "Clean Code",
//     author: "Robert C. Martin",
//     description: "A Handbook of Agile Software Craftsmanship.",
//     coverUrl: "/4.jpg",
//     pageCount: 464,
//     genre: "Programming",
//     isFeatured: false,
//   },
//   {
//     id: "book5",
//     title: "Refactoring",
//     author: "Martin Fowler",
//     description: "Improving the design of existing code.",
//     coverUrl: "/5.jpg",
//     pageCount: 448,
//     genre: "Programming",
//     isFeatured: false,
//   },
// ];

// export const bookTrackingsData = [
//   {
//     userId: "user1",
//     bookId: "book1",
//     status: "READING",
//     currentPage: 50,
//     rating: 5,
//     notes: "Taking notes on deep focus.",
//     startedAt: new Date("2025-07-01"),
//   },
//   {
//     userId: "user1",
//     bookId: "book2",
//     status: "WANT_TO_READ",
//     currentPage: 0,
//   },
//   {
//     userId: "user2",
//     bookId: "book2",
//     status: "READING",
//     currentPage: 120,
//     rating: 4,
//     notes: "Practical advice.",
//     startedAt: new Date("2025-07-05"),
//   },
//   {
//     userId: "user2",
//     bookId: "book3",
//     status: "FINISHED",
//     currentPage: 352,
//     rating: 5,
//     notes: "Must-read for devs.",
//     startedAt: new Date("2025-06-01"),
//     finishedAt: new Date("2025-07-01"),
//   },
// ];

// export const reviewsData = [
//   {
//     userId: "user1",
//     bookId: "book1",
//     rating: 5,
//     content: "Incredible book on focus and productivity.",
//   },
//   {
//     userId: "user2",
//     bookId: "book3",
//     rating: 5,
//     content: "Essential for every programmer.",
//   },
// ];

// prisma/fakeData.ts

// prisma/simpleData.ts

export const simpleData = {
  users: [
    {
      id: "user1",
      name: "Alice Johnson",
      email: "alice@example.com",
      passwordHash: "$2b$10$fakehashedpasswordalice",
      role: "user",
      image: "https://i.pravatar.cc/150?u=alice",
      paymentMethod: "card",
    },
    {
      id: "user2",
      name: "Bob Smith",
      email: "bob@example.com",
      passwordHash: "$2b$10$fakehashedpasswordbob",
      role: "user",
      image: "https://i.pravatar.cc/150?u=bob",
      paymentMethod: "paypal",
    },
  ],
  accounts: [
    {
      type: "oauth",
      provider: "google",
      providerAccountId: "google-alice",
      refresh_token: "fake_refresh_token_alice",
      access_token: "fake_access_token_alice",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: "Bearer",
      scope: "email profile",
      id_token: "fake_id_token_alice",
      session_state: "fake_session_state_alice",
      userId: "user1", // added for FK
    },
    {
      type: "oauth",
      provider: "github",
      providerAccountId: "github-bob",
      refresh_token: "fake_refresh_token_bob",
      access_token: "fake_access_token_bob",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: "Bearer",
      scope: "user repo",
      id_token: "fake_id_token_bob",
      session_state: "fake_session_state_bob",
      userId: "user2", // added for FK
    },
  ],
  sessions: [
    {
      sessionToken: "fake_session_token_alice",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: "user1", // added for FK
    },
    {
      sessionToken: "fake_session_token_bob",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: "user2", // added for FK
    },
  ],
  verificationTokens: [
    {
      identifier: "alice@example.com",
      token: "verify_token_alice",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
    {
      identifier: "bob@example.com",
      token: "verify_token_bob",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  ],
  books: [
    {
      id: "book1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      pageCount: 180,
      coverUrl: "/book_cover1.jpg",
      description:
        "Set in the Roaring Twenties, this novel captures the elusive American Dream, wealth, love, and tragedy through the mysterious Jay Gatsby's life.",
      isFeatured: true,
      publishedAt: new Date("1925-04-10"),
    },
    {
      id: "book2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      pageCount: 281,
      coverUrl: "/book_cover2.jpg",
      description:
        "A profound novel that explores racial injustice and moral growth in the Deep South through the eyes of young Scout Finch and her father, Atticus.",
      isFeatured: true,
      publishedAt: new Date("1960-07-11"),
    },
    {
      id: "book3",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      pageCount: 328,
      coverUrl: "/book_cover3.jpg",
      description:
        "This dystopian classic unveils a chilling totalitarian regime where surveillance and propaganda shape every aspect of human life, leaving no room for freedom.",
      isFeatured: false,
      publishedAt: new Date("1949-06-08"),
    },
    {
      id: "book4",
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      pageCount: 320,
      coverUrl: "/book_cover4.jpg",
      description:
        "A practical guide that shows how tiny changes can lead to remarkable results, focusing on building good habits and breaking bad ones systematically.",
      isFeatured: false,
      publishedAt: new Date("2018-10-16"),
    },
    {
      id: "book5",
      title: "Deep Work",
      author: "Cal Newport",
      genre: "Productivity",
      pageCount: 304,
      coverUrl: "/book_cover5.jpg",
      description:
        "A compelling read on cultivating focus in a distracted world, offering actionable strategies to achieve deep, meaningful work for success and satisfaction.",
      isFeatured: true,
      publishedAt: new Date("2016-01-05"),
    },
  ],
  bookTrackings: [
    {
      userId: "user1",
      bookId: "book1",
      status: TrackingStatus.READING,
      currentPage: 45,
      rating: 4,
      notes: "Enjoying the vivid descriptions.",
      startedAt: new Date("2025-07-01"),
      finishedAt: null,
    },
    {
      userId: "user2",
      bookId: "book2",
      status: TrackingStatus.WANT_TO_READ,
      currentPage: 0,
      rating: null,
      notes: null,
      startedAt: null,
      finishedAt: null,
    },
  ],
  reviews: [
    {
      userId: "user1",
      bookId: "book1",
      rating: 5,
      content: "An incredible read, timeless and deep.",
    },
    {
      userId: "user2",
      bookId: "book2",
      rating: 4,
      content: "Very thought-provoking and relevant.",
    },
  ],
};
