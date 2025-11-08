import React from 'react';
import './Theme.css';


export const Theme = () => {
    return (
        <div>
            
        </div>
    );
};

export function ChangeTheme(new_theme)
{
    document.documentElement.setAttribute( 'color-theme', new_theme );
}

