import React, { useState, useEffect } from "react";

import {
    Grid,
    VStack,
    HStack,
    Center,
    Heading,
    Box,
    Badge,
    Divider,
    IconButton,
} from "@chakra-ui/react";

export default function Tower() {
    const towerUrl = '127.0.0.1:5000/tower'

    const [error, setError] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [tower, setTower] = useState({})
    
    useEffect(() => {
        getTower()
    }, [])
    
    const getTower = async () => {
        const response = await fetch(towerUrl, {headers: {"Content-Type": "application/json"}})

        if (response.ok) {
            const tower = await response.json()
            setTower(tower)
            setIsLoaded(true)
        } else {
            const error = await response.text()
            setError(error)
            setIsLoaded(true)
        }
    }

    const saveTower = (tower: Array<string>) => {
        // Save tower in server
    }

    console.log(`Error: ${error}`)
    console.log(`Loading: ${isLoaded}`)
    console.log(`Tower: ${tower}`)

    return (
        <HStack>
            <Box p="6" minW="md" maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
                
            </Box>
        </HStack>
    )
}
