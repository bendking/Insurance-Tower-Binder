const fs = require('fs')

const towerPath = 'database/tower.json'

// In a user-facing application, I would have interfaced with a DB such as PostgreSQL and used it to store multiple towers.

const getTower = () => {
    return fs.existsSync(towerPath) ? fs.readFileSync(towerPath, 'utf8') : null
}

const saveTower = (tower) => {
    fs.writeFileSync(towerPath, JSON.stringify(tower))
}

module.exports = { getTower, saveTower }