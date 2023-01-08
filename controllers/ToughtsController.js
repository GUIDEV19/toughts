import { Tought } from "../models/Tought.js";
import { User } from "../models/User";
import { Op } from "sequelize";

export class ToughtsController {
    static async showToughts(req, res) {
        let search = '';

        if(req.query.search){
            search = req.query.search;
        }
        let order = 'DESC';

        if(req.query.order === 'old'){
            order = 'ASC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`},
            },
            order: [['createdAt', order]]
        });

        const toughts = toughtsData.map((result) => result.get({plain: true}))
        let toughtsQty = toughts.length;

        if(toughtsQty === 0){
            toughtsQty = false;
        }
        res.render('toughts/home', { toughts, search, toughtsQty});
    }

    static async dashbord(req, res){
        const userId = req.session.userid;
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true
        });

        if(!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false;

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashbord', {toughts, emptyToughts});
    }

    static createToughts(req, res){
        res.render('toughts/create');
    }

    static async createToughtsSave(req, res){
        console.log('estou aqui')
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        };

        try{
            await Tought.create(tought);
            req.flash('message', 'Pensamento Criado com sucesso!');
            req.session.save(() => {
                res.redirect('/toughts/dashbord')
            })
        } catch(e){
            console.log(e);
        }
        
    }

    static async editToughts(req, res) {
        const id = req.params.id;

        const tought = await Tought.findOne({
            where: {
                id: id
            },
            raw: true
        });

        res.render('toughts/edit', {tought});
    }

    static async editToughtsSave(req, res){
        const {id, title} = req.body;
        const UserId = req.session.userid;

        const tought = {
            id,
            title
        };

        try {
            await Tought.update(tought, {where: { id: id, UserId: UserId}});
            
            req.flash('message', 'Pensamento Editado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashbord')
            });
        } catch (e){
            console.log(e)
        }
    }

    static async removeTought(req, res){
        const id = req.body.id;
        const UserId = req.session.userid
        try{
            await Tought.destroy({where: { id: id, Userid: UserId }});

            req.flash('message', 'Pensamento excluido com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashbord')
            });
        } catch (e){
            console.log(e)
        }
        
    }
}