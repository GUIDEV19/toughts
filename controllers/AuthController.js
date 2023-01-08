import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

export class AuthController {
    static async login(req, res){
        res.render('auth/login');
    }

    static async loginPost(req, res){
        const {email, password} = req.body;
        
        const user = await User.findOne({where: { email: email}});
        if(!user){
            req.flash('message', 'E-mail incorreto ou inexistente!');
            res.render('auth/login');
            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch){
            req.flash('message', 'Senha Incorreta!')
            res.render('auth/login')
            return
        }

        req.session.userid = user.id;
        req.flash('message', 'Autenticação realizada com sucesso.');

        await req.session.save(() => {
            res.redirect('/')
        });
        
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body;
        if(password != confirmpassword){
            req.flash('message', 'as senhas não conferem, tente novamente!');
            res.render('auth/register');
            return
        }

        const checkIfUserExists = await User.findOne({where: { email: email } });
        if(checkIfUserExists){
            req.flash('message', 'O e-mail já está em uso, selecione outro ou acesse sua conta!');
            res.render('auth/register');
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        }
        
        try{
            const createdUser = await User.create(user);
            req.session.userid = createdUser.id;
            req.flash('message', 'Cadastro realizado com sucesso!');
            req.session.save(() => {
                res.redirect('/');
            });
        } catch (e){
            console.log(err);
        }
    }

    static logout(req, res){
        req.session.destroy();
        res.redirect('/login');
    }
}