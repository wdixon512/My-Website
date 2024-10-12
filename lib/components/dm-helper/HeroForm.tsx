// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
// } from "@chakra-ui/react";
// import { useContext, useState } from "react";
// import { DMHelperContext } from "../contexts/DMHelperContext";

// export const HeroForm = () => {
//     const [heroName, setHeroName] = useState("");
//     const [heroInitiative, setHeroInitiative] = useState<number | undefined>(undefined);

//     const { setHeroes, addHero } = useContext(DMHelperContext);

//     const clearHeroes = () => {
//         setHeroes([]);
//     };

//     const handleAddHero = (e) => {
//         e.preventDefault();

//         if (addHero(heroName, heroInitiative)) {
//             setHeroName("");
//             setHeroInitiative(undefined);
//         }
//     };

//     return (
//         <Box
//             as="form"
//             p={4}
//             bg="gray.50"
//             borderWidth={1}
//             borderRadius="md"
//             shadow="md"
//             onSubmit={handleAddHero}
//         >
//             <FormControl mb={4}>
//                 <FormLabel color="blackAlpha.900">Hero Name</FormLabel>
//                 <Input
//                     type="text"
//                     value={heroName}
//                     color="blackAlpha.700"
//                     onChange={(e) => setHeroName(e.target.value)}
//                     placeholder="Enter hero name"
//                     required={true}
//                 />
//             </FormControl>
//             <FormControl mb={4}>
//                 <FormLabel color="blackAlpha.900">Hero Initiative</FormLabel>
//                 <Input
//                     type="number"
//                     color="blackAlpha.700"
//                     value={heroInitiative}
//                     onChange={(e) => setHeroInitiative(parseInt(e.target.value))}
//                     placeholder="Enter hero initiative"
//                     required={true}
//                 />
//             </FormControl>
//             <Button type="submit" variant="solid" width="full">
//                 Add Hero
//             </Button>

//             <Button variant="redLink" width="full" onClick={clearHeroes} mt="4">
//                 Clear Heroes
//             </Button>
//         </Box>
//     );
// };
