import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - expanded with profile information
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  instagram: text("instagram").notNull().unique(),
  password: text("password").notNull(),
  birthdate: text("birthdate").notNull(),
  age: integer("age").notNull(),
  zodiac: text("zodiac").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User preferences table
export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  sexualPreference: text("sexual_preference").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Questionnaire responses table
export const questionnaireResponses = pgTable("questionnaire_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  preference: text("preference").notNull(),
  answers: jsonb("answers").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Compatibility results table
export const compatibilityResults = pgTable("compatibility_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  score: integer("score").notNull(),
  message: text("message").notNull(),
  tips: jsonb("tips").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  preference: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
  responses: many(questionnaireResponses),
  results: many(compatibilityResults),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

export const questionnaireResponsesRelations = relations(questionnaireResponses, ({ one }) => ({
  user: one(users, {
    fields: [questionnaireResponses.userId],
    references: [users.id],
  }),
}));

export const compatibilityResultsRelations = relations(compatibilityResults, ({ one }) => ({
  user: one(users, {
    fields: [compatibilityResults.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  instagram: true,
  password: true,
  birthdate: true,
  age: true,
  zodiac: true,
});

export const insertUserPreferenceSchema = createInsertSchema(userPreferences).pick({
  userId: true,
  sexualPreference: true,
});

export const insertQuestionnaireResponseSchema = createInsertSchema(questionnaireResponses).pick({
  userId: true,
  preference: true,
  answers: true,
});

export const insertCompatibilityResultSchema = createInsertSchema(compatibilityResults).pick({
  userId: true,
  score: true,
  message: true,
  tips: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertUserPreference = z.infer<typeof insertUserPreferenceSchema>;
export type UserPreference = typeof userPreferences.$inferSelect;

export type InsertQuestionnaireResponse = z.infer<typeof insertQuestionnaireResponseSchema>;
export type QuestionnaireResponse = typeof questionnaireResponses.$inferSelect;

export type InsertCompatibilityResult = z.infer<typeof insertCompatibilityResultSchema>;
export type CompatibilityResult = typeof compatibilityResults.$inferSelect;
