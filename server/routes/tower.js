const express = require('express')
const towerController = require('../controllers/towerController')

const router = express.Router()

// In a user-facing application I would have used '/:id' to get and save a specific tower.

router
    .route('/')
    .get((req, res) => {
        try {
            const tower = towerController.getTower()
            tower ? res.send(tower) : res.sendStatus(204)
        } catch (err) {
            console.error(err)
            res.status(500).send('Something went wrong. Failed to get tower.')
        }

    })
    .put((req, res) => {
        try {
            towerController.saveTower(req.body)
            res.sendStatus(200)
        } catch (err) {
            console.error(err)
            res.status(500).send('Something went wrong. Failed to update tower.')
        }
    })

module.exports = router