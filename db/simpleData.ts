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
    {
      userId: "user1",
      bookId: "atomic-habits-clm2b3c4d5e6f7g8h9i0j1k2",
      rating: 5,
      content:
        "Atomic Habits isn’t just a self-help book — it’s a blueprint for rewiring your life in the smallest, most powerful ways. James Clear distills change into something tangible, almost mechanical, yet deeply human. I left each chapter feeling like I had a new tool in my hands.",
    },
    
    {
      userId: "user1",
      bookId: "the-psychology-of-money-clm5e6f7g8h9i0j1k2l3m4n5",
      rating: 5,
      content:
        "This isn’t a book about getting rich; it’s about getting wise. The Psychology of Money made me rethink every decision I’ve made about saving, spending, and wanting. Morgan Housel’s voice feels like a calm friend explaining the obvious truths we all manage to miss.",
    },
    {
      userId: "user2",
      bookId: "project-hail-mary-clm6f7g8h9i0j1k2l3m4n5o6",
      rating: 5,
      content:
        "Project Hail Mary is part science lesson, part heart-racing survival story. Andy Weir somehow makes astrophysics funny, and loneliness on the edge of space feel full of hope. I laughed, I gasped, and I rooted for Ryland Grace like he was an old friend.",
    },
    {
      userId: "user1",
      bookId: "where-the-crawdads-sing-clm9i0j1k2l3m4n5o6p7q8r9",
      rating: 4,
      content:
        "A love letter to the marshes and a murder mystery intertwined. Delia Owens paints nature so vividly you can almost smell the salt air. The ending left me quiet, unsure if it was justice or tragedy.",
    },
    {
      userId: "user2",
      bookId: "sapiens-clm0j1k2l3m4n5o6p7q8r9s0",
      rating: 5,
      content:
        "Sapiens reads like a long conversation with the smartest, most cynical friend you’ve ever had. Harari zooms out so far on human history that you start questioning why we do anything at all — and yet, it’s exhilarating.",
    },
    {
      userId: "user1",
      bookId: "the-poppy-war-clm9s0t1u2v3w4x5y6z7a8b9",
      rating: 5,
      content:
        "The Poppy War is brutal, brilliant, and unflinchingly honest about the cost of ambition. R.F. Kuang builds a world that feels both fantastical and frighteningly real. Not for the faint of heart — but unforgettable.",
    },
    {
      userId: "user2",
      bookId: "the-martian-clm0t1u2v3w4x5y6z7a8b9c0",
      rating: 4,
      content:
        "The Martian is pure problem-solving adrenaline. Andy Weir turns survival into a math puzzle, and somehow makes it hilarious. A love letter to human ingenuity — and duct tape.",
    },
  ],
};
