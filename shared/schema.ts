import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fid: integer("fid").unique(),
  username: text("username").notNull(),
  displayName: text("display_name"),
  pfpUrl: text("pfp_url"),
  bio: text("bio"),
});

export const games = pgTable("games", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  status: text("status").notNull().default("waiting"), // waiting, active, completed
  prediction: text("prediction"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  playerCount: integer("player_count").default(0),
});

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameId: varchar("game_id").notNull(),
  userId: varchar("user_id").notNull(),
  prediction: text("prediction"),
  isWinner: boolean("is_winner").default(false),
  joinedAt: timestamp("joined_at").default(sql`now()`),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameId: varchar("game_id").notNull(),
  userId: varchar("user_id").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  fid: true,
  username: true,
  displayName: true,
  pfpUrl: true,
  bio: true,
});

export const insertGameSchema = createInsertSchema(games).pick({
  prediction: true,
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  gameId: true,
  userId: true,
  prediction: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  gameId: true,
  userId: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Game = typeof games.$inferSelect;
export type Player = typeof players.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
