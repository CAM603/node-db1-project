const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

function validateId(req, res, next) {
    if(!isNaN(req.params.id))
    return next();
    next(new Error('Invalid ID'))
}

router.get('/', (req, res) => {
    console.log(req.query)
    if(req.query.name) {
        db('accounts').where({name: req.query.name})
        .then(accounts => {
            
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed to get list of accounts' })
        })
    } else {
        db('accounts')
            .then(accounts => {
                
                res.status(200).json(accounts)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: 'Failed to get list of accounts' })
            })
    }
})

// router.get('/:id', (req, res) => {
//     db('accounts')
//         .where({ id: req.params.id })
//         .then(account => {
//             res.status(200).json(account[0])
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ error: 'Failed to retrieve account' })
//         })
// })
// WITH .first()
router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed to retrieve account' })
        })
})

router.post('/', (req, res) => {
    db('accounts')
        .insert(req.body, 'id')
        .then(ids => {
            db('accounts')
                // .where('id', ids[0])
                .where({id: ids[0]})
                .then(inserted => {
                    res.status(201).json(inserted)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed adding account'})
        })
})

router.put('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id}) // DO NOT FORGET OR GET FIRED :P
        .update(req.body)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed to update account' })
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db('accounts')
        .where({id})
        .delete()
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed to delete account' })
        })
})

module.exports = router;