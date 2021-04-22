import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import StackRouter from '../routes/stack.routes';
const Routes = () => (
    <NavigationContainer>
        <StackRouter />
    </NavigationContainer>
);

export default Routes;