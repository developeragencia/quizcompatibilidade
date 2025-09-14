import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserPreferenceSchema, 
  insertQuestionnaireResponseSchema,
  insertCompatibilityResultSchema
} from "@shared/schema";

// Helper function to calculate compatibility (same logic as frontend but on backend)
function calculateCompatibilityScore(answers: any, preference: string): { score: number; message: string; tips: string[] } {
  const idealAnswers: { [key: string]: string } = {
    hygiene: 'Sempre, é fundamental',
    shower_before: 'Sempre',
    work_life: 'Amo o que faço',
    relationship_type: 'Algo sério e duradouro',
    sexual_frequency: 'Algumas vezes por semana',
  };
  
  if (preference.includes('ativo')) {
    idealAnswers.penis_size = '18';
    idealAnswers.likes_in_bottom = 'Bunda média';
    idealAnswers.sexual_intensity = 'Intenso e quente';
  }
  
  if (preference.includes('passivo')) {
    idealAnswers.butt_size = 'Média';
    idealAnswers.butt_tightness = 'Apertada';
    idealAnswers.likes_in_top = 'Personalidade';
  }
  
  let score = 0;
  const totalQuestions = Object.keys(answers).length;
  
  Object.keys(answers).forEach(questionId => {
    if (idealAnswers[questionId] && answers[questionId] === idealAnswers[questionId]) {
      score++;
    }
  });
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message: string;
  if (percentage === 100) {
    message = "🎉 PERFEITO! Vocês são totalmente compatíveis! Alex está esperando por você! 💖";
  } else if (percentage >= 90) {
    message = "😊 Quase lá! Vocês têm muita compatibilidade, mas alguns ajustes podem ajudar.";
  } else if (percentage >= 70) {
    message = "🤔 Compatibilidade moderada. Há potencial, mas precisam conversar mais sobre expectativas.";
  } else {
    message = "😔 Pouca compatibilidade no momento. Talvez vocês sejam melhores como amigos por enquanto.";
  }
  
  const tips = [
    "🚿 Sempre tome banho antes dos encontros - ninguém resiste a alguém cheirosinho!",
    "🦷 Escove os dentes e use fio dental - seu sorriso é seu cartão de visitas!",
    "🧴 Use desodorante e perfume suave - o olfato é um dos sentidos mais poderosos!",
    "🛡️ Use sempre camisinha - sexo seguro é sexy e demonstra cuidado!",
    "💅 Cuide das unhas - detalhes fazem toda a diferença!"
  ];
  
  return { score: percentage, message, tips };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByInstagram(userData.instagram);
      if (existingUser) {
        return res.status(400).json({ error: 'Instagram já cadastrado' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Remove password from response
      const { password, ...userResponse } = user;
      res.status(201).json({ user: userResponse });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: 'Erro no cadastro' });
    }
  });
  
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { instagram, password } = req.body;
      
      if (!instagram || !password) {
        return res.status(400).json({ error: 'Instagram e senha são obrigatórios' });
      }
      
      // Find user
      const user = await storage.getUserByInstagram(instagram);
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
      
      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
      
      // Remove password from response
      const { password: _, ...userResponse } = user;
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Erro no login' });
    }
  });
  
  // Preference Routes
  app.post('/api/preferences', async (req, res) => {
    try {
      const preferenceData = insertUserPreferenceSchema.parse(req.body);
      const preference = await storage.createUserPreference(preferenceData);
      res.status(201).json({ preference });
    } catch (error) {
      console.error('Preference creation error:', error);
      res.status(400).json({ error: 'Erro ao salvar preferência' });
    }
  });
  
  app.get('/api/preferences/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const preference = await storage.getUserPreference(userId);
      res.json({ preference });
    } catch (error) {
      console.error('Get preference error:', error);
      res.status(500).json({ error: 'Erro ao buscar preferência' });
    }
  });
  
  // Questionnaire Routes
  app.post('/api/questionnaire', async (req, res) => {
    try {
      const responseData = insertQuestionnaireResponseSchema.parse(req.body);
      const response = await storage.saveQuestionnaireResponse(responseData);
      
      // Calculate compatibility and save result
      const { score, message, tips } = calculateCompatibilityScore(responseData.answers, responseData.preference);
      
      const resultData = {
        userId: responseData.userId,
        score,
        message,
        tips
      };
      
      const result = await storage.saveCompatibilityResult(resultData);
      
      res.status(201).json({ response, result });
    } catch (error) {
      console.error('Questionnaire save error:', error);
      res.status(400).json({ error: 'Erro ao salvar questionário' });
    }
  });
  
  app.get('/api/questionnaire/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const response = await storage.getQuestionnaireResponse(userId);
      res.json({ response });
    } catch (error) {
      console.error('Get questionnaire error:', error);
      res.status(500).json({ error: 'Erro ao buscar questionário' });
    }
  });
  
  // Results Routes
  app.get('/api/results/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await storage.getCompatibilityResult(userId);
      res.json({ result });
    } catch (error) {
      console.error('Get result error:', error);
      res.status(500).json({ error: 'Erro ao buscar resultado' });
    }
  });
  
  // User Routes
  app.get('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      // Remove password from response
      const { password, ...userResponse } = user;
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
