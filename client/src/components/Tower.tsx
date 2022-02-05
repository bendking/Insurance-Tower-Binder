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
    Spinner,
} from "@chakra-ui/react";
interface TowerState {
    name: string;
    layers: Array<LayerState>;
}

interface LayerState {
    carrier: string;
    part: number;  
}

export default function Tower() {
    const towerUrl = 'http://localhost:5000/tower'

    const initialState = {
        'name': 'Client Tower',
        'layers': [
            {'carrier': 'AIG', 'part': 0.2},
            {'carrier': 'Direct', 'part': 0.2},
            {'carrier': 'Phoenix', 'part': 0.2},
            {'carrier': 'Clal', 'part': 0.2},
            {'carrier': 'Harel', 'part': 0.2},
        ]
    }

    const [error, setError] = useState<any>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [tower, setTower] = useState<TowerState>(initialState) // TODO: Remove initial values
    
    useEffect(() => {
        getTower()
    }, [])
    
    const getTower = async () => {
        try {
            const response = await fetch(towerUrl, {headers: {"Content-Type": "application/json", "Accept": "application/json"}})
            const tower = await response.json()
            // setTower(tower)
            setIsLoaded(true)
        } catch (error: any) {
            console.error(error)
            setError(error)
            setIsLoaded(true)
        }
    }

    const saveTower = async (tower: TowerState) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tower)
            }
            const response = await fetch(towerUrl, requestOptions)
        } catch (error) {
            // In a user-facing application I would have added a "isSaved" hook and 
            // shown an alert indicating that the tower failed to save.
            console.error(`Failed to save tower: ${error}`)
        }
    }

    console.log(`Error: ${error}`)
    console.log(`Loading: ${isLoaded}`)
    console.log(`Tower name: ${tower?.name}`)
    console.log(`Tower layers: ${JSON.stringify(tower?.layers)}`)

    const layers = tower.layers.map(layer => (
        <li key={layer.carrier}>
            {layer.carrier}
        </li>
    ))

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <Spinner/>;
      } else {
        return (
        <Center> 
          <Heading>Welcome to the Tower Binder!</Heading>
          <ul>
          {layers}
          </ul>
        </Center>
        //   <ul>
        //     {tower.layers.map(layer => (

        //     ))}
        //   </ul>
        );
      }

    return (
        <HStack>
            <Box p="6" minW="md" maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
                
            </Box>
        </HStack>
    )
}
