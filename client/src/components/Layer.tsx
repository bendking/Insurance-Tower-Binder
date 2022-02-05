import React from "react";

import {
  Select,
  VStack,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

type LayerProps = {
  layerCarrier: string;
  layerStake: number;
  handleLayerChange: Function;
  carrierOptions: Array<string>;
};

export default function Layer({ layerCarrier, layerStake, handleLayerChange, carrierOptions }: LayerProps) {
  const options = carrierOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  const handleCarrierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLayer = {
      carrier: event.target.value,
      stake: layerStake,
    };

    handleLayerChange(newLayer);
  };

  const handleStakeChange = (valueAsString: string) => {
    const newLayer = {
      carrier: layerCarrier,
      stake: parseInt(valueAsString),
    };

    handleLayerChange(newLayer);
  };

  const addDollar = (num: number) => `$` + num;
  const removeDollar = (str: string) => str.replace(/^\$/, "");

  return (
    <Box p="6" maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <VStack spacing={3} maxW="10em">
        <Select value={layerCarrier} onChange={handleCarrierChange} placeholder="Select carrier">
          {options}
        </Select>

        <NumberInput
          value={addDollar(layerStake)}
          onChange={(stakeString) => handleStakeChange(removeDollar(stakeString))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput />
      </VStack>
    </Box>
  );
}
