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
  const towerUrl = "http://localhost:5000/tower";

  // In a user-facing app, I would have made it possible to dynamically add & remove layers
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
      const response = await fetch(towerUrl, requestOptions);
      const tower = JSON.parse(await response.json());
      setTower(tower);
      setIsLoaded(true);
    } catch (error: any) {
      console.error(error);
      setError(error);
      setIsLoaded(true);
    }
  };

  // In a user-facing application I would have added feedback indicating when the tower was saving, and had
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

  // In a user-facing app, I would have gotten the carrier options from the server.
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
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <VStack spacing={50}>
        <Heading>Welcome to the Tower Binder!</Heading>
        <HStack spacing={3}>{layers}</HStack>
        <Button onClick={() => saveTower(tower)}>Save Tower</Button>
      </VStack>
    );
  }
}
