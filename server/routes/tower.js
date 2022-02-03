const express = require('express')
const towerController = require('../controllers/towerController')

const router = express.Router()

// In a user-facing application I would have used '/:id' to get and save a specific tower.

router
    .route('/')
    .get((req, res) => {
        try {
            const tower = towerController.getTower()
            res.send(JSON.stringify(tower))
        } catch (err) {
            console.error(err)
            res.status(500).send('Something went wrong. Failed to get tower.')
        }
    
    })
    .put((req, res) => {
        try {
            const tower = req.body.tower
            towerController.saveTower(tower)
        } catch (err) {
            console.error(err)
            res.status(500).send('Something went wrong. Failed to update tower.')
        }
    })

module.exports = router