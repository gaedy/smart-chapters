import { TrackingStatus } from "@prisma/client";
import { hashSync } from "bcrypt-ts";

export const simpleData = {
  users: [
    {
      id: "user1",
      name: "Alice Johnson",
      email: "alice@example.com",
      passwordHash: hashSync("123456", 10),
      role: "user",
      image: "/avatar01.jpg",
      paymentMethod: "card",
    },
    {
      id: "user2",
      name: "Bob Smith",
      email: "bob@example.com",
      passwordHash: hashSync("123456", 10),
      role: "user",
      image: "/avatar02.jpg",
      paymentMethod: "paypal",
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
      bookId: "the-midnight-library-clm1a2b3c4d5e6f7g8h9i0j1",
      status: TrackingStatus.READING,
      currentPage: 45,
      rating: 4,
      notes: "Enjoying the vivid descriptions.",
      startedAt: new Date("2025-07-01"),
      finishedAt: null,
    },
    {
      userId: "user2",
      bookId: "dune-clm4d5e6f7g8h9i0j1k2l3m4",
      status: TrackingStatus.WANT_TO_READ,
      currentPage: 36,
      rating: 4,
      notes: null,
      startedAt: null,
      finishedAt: null,
    },
    {
      userId: "user1",
      bookId: "dune-clm4d5e6f7g8h9i0j1k2l3m4",
      status: TrackingStatus.READING,
      currentPage: 161,
      rating: 3,
      notes: null,
      startedAt: null,
      finishedAt: null,
    },
    {
      userId: "user1",
      bookId: "atomic-habits-clm2b3c4d5e6f7g8h9i0j1k2",
      status: TrackingStatus.FINISHED,
      currentPage: 114,
      rating: 5,
      notes: null,
      startedAt: null,
      finishedAt: null,
    },
  ],
  reviews: [
    {
      userId: "user1",
      bookId: "the-midnight-library-clm1a2b3c4d5e6f7g8h9i0j1",
      rating: 5,
      content:
        "There are books you read, and there are books that read you back. The Midnight Library by Aurelia Wren is the latter — a luminous, surreal journey through the rooms of regret and the corridors of possibility. I finished it at 3:42 a.m., unable to sleep, and feeling as though I had just emerged from a dream both painful and beautiful.",
    },
    {
      userId: "user2",
      bookId: "the-midnight-library-clm1a2b3c4d5e6f7g8h9i0j1",
      rating: 3,
      content:
        "The premise is undeniably captivating — a mysterious library that exists between life and death, filled with books representing every life you could have lived. That idea alone hooked me. And to the book’s credit, Aurelia Wren has a lovely, poetic writing style that sometimes reads like a dream.",
    },
    {
      userId: "user2",
      bookId: "dune-clm4d5e6f7g8h9i0j1k2l3m4",
      rating: 4,
      content: "Very thought-provoking and relevant.",
    },
  ],
};
