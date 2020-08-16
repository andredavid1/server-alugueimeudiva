import { Request, Response } from 'express';
import db from "../database/connection";
import nodemailer = require('nodemailer');

export default class LeedsController {
    async index(request: Request, response: Response) {
        try {
            const leeds = await db('leeds');

            return response.json(leeds);    
        } catch (error) {
            return response.status(400).json({
                error
            })
        }        
    }

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        if(!email || email.trim() === '') {
            return response.status(400).json({ error: "Campo e-mail precisa ser preenchido." });
        }
        
        try {
            const leeds = await db('leeds').insert({
                name, email
            });

            if(leeds) {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.umbler.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'andredavid@aetsolucoeswebemarketing.com.br',
                        pass: 'Fogo12/79'
                    }
                });
                
                const mailOptions = {
                    from: 'andredavid@aetsolucoeswebemarketing.com.br',
                    to: email,
                    subject: 'enviando email com nodemailer',
                    text: `Obrigado por se inscrever ${name}. Em breve entraremos em contato, trazendo informações e conteúdos de seu interesse. Aguarde. Dra. Melissa Duarte - Psiquiatra`,
                    html: `<body style="background-color: #6b946b;">
                            <h1 style="color: #6b946b; text-align: center;">Obrigado por se inscrever ${name}!</h1>
                            <br />
                            <p style='text-align: center; font-size: 18px; color: #206382;'>Em breve entraremos em contato, trazendo informações e conteúdos de seu interesse.</p>
                            <br />
                            <h2 style='width: 100%; text-align: center; color: #206382;'>Aguarde.</h2>
                            <br />
                            <p style="text-align: center; color: #6b946b">Aproveite e inscreva-se no meu canal no Youtube:</p>
                            <p style="text-align: center;"><a style="color: #206382; text-decoration: none;" href="https://www.youtube.com/channel/UC9AiOKqFcPbqJPB_YfMVilQ">Aluguei meu Divã</a></p>
                            <br />
                            <br />
                            <p style="text-align: center; color: #6b946b; margin-bottom: 0;">Dra. Melissa Duarte - Psiquiatra</p>
                            <br />
                            <p style="text-align: center; color: #6b946b; margin-top: 0;">Goiânia - Go</p>
                        </body>`
                };
    
                await transporter.sendMail(mailOptions);
            }

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
}
