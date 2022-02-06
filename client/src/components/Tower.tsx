import { useState, useEffect } from "react";
import { VStack, HStack, Heading, Spinner, Button } from "@chakra-ui/react";

import Layer from "./Layer";
interface TowerType {
  name: string;
  layers: Array<LayerType>;
}

export interface LayerType {
  carrier: string;
  stake: number;
}

export default function Tower() {
  // In a user-facing app I would have stored values such as this in a configuration file.
  const towerUrl = "http://localhost:5000/tower";

  // In case no tower is saved on the server.
  const initialState = {
    name: "Client Tower",
    layers: [
      { carrier: "", stake: 0 },
      { carrier: "", stake: 0 },
      { carrier: "", stake: 0 },
      { carrier: "", stake: 0 },
      { carrier: "", stake: 0 },
    ],
  };

  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [tower, setTower] = useState<TowerType>(initialState);

  useEffect(() => {
    getTower();
  }, []);

  const getTower = async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
			// If no tower exists, the server returns 204, so we check for 200.
      const response = await fetch(towerUrl, requestOptions);
			response.status === 200 && setTower(await response.json())
      setIsLoaded(true);
    } catch (error: any) {
      console.error(error);
      setError(error);
      setIsLoaded(true);
    }
  };

  // In a user-facing app I would have added feedback indicating when the tower was saving, and had
  // shown an alert indicating whether it had succesfully saved or not (using the Alert ChakraUI component).
  const saveTower = async (tower: TowerType) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tower),
    };

    try {
      await fetch(towerUrl, requestOptions);
    } catch (error) {
      console.error(`Failed to save tower: ${error}`);
    }
  };

  // In a user-facing app I would have made it possible to dynamically add & remove layers and to change the tower's name.
  // const addLayer = () => ...
  // const removeLayer = () => ...
  // const handleNameChange = () => ...

  const handleLayerChange = (i: number) => (layer: LayerType) => {
    setTower((prevTower) => {
      const newLayers = [...prevTower.layers];
      newLayers[i] = layer;

      return {
        ...prevTower,
        layers: newLayers,
      };
    });
  };

  // In a user-facing app, I would have gotten the carrier options from the server instead of hard-coding them.
  const defaultCarrierOptions = ["AIG", "Direct", "Phoenix", "Clal", "Harel"];
  const chosenCarrierOptions = new Set(tower.layers.map((layer) => layer.carrier));
  const remainingCarrierOptions = defaultCarrierOptions.filter(
    (carrier) => !chosenCarrierOptions.has(carrier)
  );

  const layers = tower.layers.map((layer, i) => (
    <Layer
      key={i}
      layerCarrier={layer.carrier}
      layerStake={layer.stake}
      carrierOptions={layer.carrier ? [...remainingCarrierOptions, layer.carrier] : remainingCarrierOptions}
      handleLayerChange={handleLayerChange(i)}
    />
  ));

  if (error) {
    return <Heading>Failed to load tower: {error.message}</Heading>;
  } else if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <VStack spacing={50}>
        <Heading>{tower.name}</Heading>
        <HStack spacing={3}>{layers}</HStack>
        <Button onClick={() => saveTower(tower)}>Save Tower</Button>
      </VStack>
    );
  }
}
