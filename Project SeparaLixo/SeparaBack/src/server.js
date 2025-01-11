import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(bodyParser.json());
app.use(express.json());

//----------------------------------

// Enviar e-mail
app.post("/sendEmail", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiration = Date.now() + 3600000; // Token valido por 1 hora

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(expiration),
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log("Erro na configuração SMTP:", error);
      } else {
        console.log("Servidor SMTP configurado e pronto para enviar e-mails!");
      }
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const emailContent = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="text-align: center; color:rgb(53, 152, 245);">Recuperação de Senha</h2>
    <p style="font-size: 16px; line-height: 1.6;">
      Olá,</p>
      <p style="font-size: 16px; line-height: 1.6;">Você solicitou a redefinição de sua senha. Clique no botão abaixo para continuar o processo:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" style="background-color:rgb(53, 152, 245);; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
        Redefinir Senha
      </a>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      Se você não solicitou essa redefinição, ignore este e-mail. O link expira em 1 hora.
    </p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #777; text-align: center;">
      Este é um e-mail automático, por favor não responda.
    </p>
    <p style="font-size: 12px; color: #777; text-align: center;">
      © 2024 SeparaLixo. Todos os direitos reservados.
    </p>
  </div>
`;

    await transporter.sendMail({
      from: "recuperacaoseparalixo@gmail.com",
      to: userEmail,
      subject: "Recuperação de Senha",
      html: emailContent,
    });

    res.json({ message: "E-mail de recuperação enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar o e-mail de recuperação:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

app.post(`/api/reset-password/:token`, async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gte: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Limpa o token e a expiração
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    res.json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir a senha.", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Criar usuário
app.post("/api/babas", async (req, res) => {
  const { email, name, password, whatsapp, role, street, neighborhood, number, city, zipCode, state } = req.body;

  try {
    if (!email || !name || !password || !role || !street || !neighborhood || !number || !city || !zipCode || !state) {
      return res
        .status(400)
        .json({ error: "Por favor, preencha todos os campos obrigatórios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        whatsapp,
        role: role.toUpperCase(),
        street,
        neighborhood,
        number,
        city,
        zipCode,
        state,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar babá:", error);
    res.status(500).json({ error: "Erro ao criar babá" });
  }
});

app.post("/api/contratantes", async (req, res) => {
  const { email, name, password, whatsapp, role, street, neighborhood, number, city, zipCode, state } = req.body;

  try {
    if (!email || !name || !password || !whatsapp || !role || !street || !neighborhood || !number || !city || !zipCode || !state) {
      return res
        .status(400)
        .json({ error: "Por favor, preencha todos os campos obrigatórios." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        whatsapp,
        role: role.toUpperCase(),
        street,
        neighborhood,
        number,
        city,
        zipCode,
        state,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("Erro ao criar usuario", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota de login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Usuário encontrado:", user); // Log do usuário encontrado

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user.id, role: user.role });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token Inválido" });
    }
    req.user = user;
    next();
  });
};

//Rota para obter informações do usuário
app.get("/api/babas", async (req, res) => {
  try {
    const babas = await prisma.user.findMany({
      where: {
        role: "BABA",
      },
      include: {
        babysitterData: true,
      },
    });

    res.status(200).json(babas);
  } catch (error) {
    console.error("Erro ao buscar babás", error);
    res.status(500).json({ message: "erro no servidor." });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
