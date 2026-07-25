import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/logo hmti baru.png"
            alt="HMTI Logo"
            className={className}
            {...props}
        />
    );
}
