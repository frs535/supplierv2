import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import LoginForm from "../scenes/auth/LoginForm";
import Profile from "../scenes/profile";
import ProductGrid from "../components/ProductGrid";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/LoginForm">
                <LoginForm/>
            </ComponentPreview>
            <ComponentPreview path="/Profile">
                <Profile/>
            </ComponentPreview>
            <ComponentPreview path="/ProductGrid">
                <ProductGrid/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews