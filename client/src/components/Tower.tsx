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

function Tower() {
    const [tower, setTower] = useState([])

    const getTower = () => {
        // Return tower from server
    }

    const saveTower = (tower: Array<string>) => {
        // Save tower in server
    }

    useEffect(() => {
        const tower = getTower()
        setTower(tower)
    }, [])

    const 

    return (
        <HStack>
            <Box p="6" minW="md" maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
                
            </Box>
        </HStack>
    )
}
