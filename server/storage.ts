import { 
  users, 
  userPreferences, 
  questionnaireResponses, 
  compatibilityResults,
  type User, 
  type InsertUser,
  type InsertUserPreference,
  type InsertQuestionnaireResponse,
  type InsertCompatibilityResult,
  type UserPreference,
  type QuestionnaireResponse,
  type CompatibilityResult
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByInstagram(instagram: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Preference methods
  createUserPreference(preference: InsertUserPreference): Promise<UserPreference>;
  getUserPreference(userId: string): Promise<UserPreference | undefined>;
  
  // Questionnaire methods
  saveQuestionnaireResponse(response: InsertQuestionnaireResponse): Promise<QuestionnaireResponse>;
  getQuestionnaireResponse(userId: string): Promise<QuestionnaireResponse | undefined>;
  
  // Results methods
  saveCompatibilityResult(result: InsertCompatibilityResult): Promise<CompatibilityResult>;
  getCompatibilityResult(userId: string): Promise<CompatibilityResult | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByInstagram(instagram: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.instagram, instagram));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Preference methods
  async createUserPreference(preference: InsertUserPreference): Promise<UserPreference> {
    const [userPreference] = await db
      .insert(userPreferences)
      .values(preference)
      .returning();
    return userPreference;
  }
  
  async getUserPreference(userId: string): Promise<UserPreference | undefined> {
    const [preference] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    return preference || undefined;
  }
  
  // Questionnaire methods
  async saveQuestionnaireResponse(response: InsertQuestionnaireResponse): Promise<QuestionnaireResponse> {
    const [questionnaireResponse] = await db
      .insert(questionnaireResponses)
      .values(response)
      .returning();
    return questionnaireResponse;
  }
  
  async getQuestionnaireResponse(userId: string): Promise<QuestionnaireResponse | undefined> {
    const [response] = await db
      .select()
      .from(questionnaireResponses)
      .where(eq(questionnaireResponses.userId, userId))
      .orderBy(questionnaireResponses.createdAt);
    return response || undefined;
  }
  
  // Results methods
  async saveCompatibilityResult(result: InsertCompatibilityResult): Promise<CompatibilityResult> {
    const [compatibilityResult] = await db
      .insert(compatibilityResults)
      .values(result)
      .returning();
    return compatibilityResult;
  }
  
  async getCompatibilityResult(userId: string): Promise<CompatibilityResult | undefined> {
    const [result] = await db
      .select()
      .from(compatibilityResults)
      .where(eq(compatibilityResults.userId, userId))
      .orderBy(compatibilityResults.createdAt);
    return result || undefined;
  }
}

export const storage = new DatabaseStorage();
