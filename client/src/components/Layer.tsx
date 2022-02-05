import React, { useState, useEffect, ChangeEventHandler } from "react";

import {
    Select,
    VStack,
    Box
} from "@chakra-ui/react";

type LayerProps = {
    carrierChosen: string;
    carrierOptions: Array<string>;
    handleChange: ChangeEventHandler<HTMLSelectElement>;
};
  
export default function Layer({carrierChosen, carrierOptions, handleChange}: LayerProps) {
    const options = carrierOptions.map(option => (
        <option key={option} value={option}>{option}</option>
    ));

    <Box p="6" minW="md" maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <VStack>
            <Select value={carrierChosen} onChange={handleChange} placeholder='Select carrier'>
                {options}
            </Select>
        </VStack>
    </Box>
}