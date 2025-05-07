# Data Grid

## URL State persistence

if you want to persist the state of the grid, you need to pass `useURLState` prop to the DataGrid component.

```tsx
<DataGrid
    gridDefinitionUrl="/api/grid/definition/example"
    beOrigin="http://localhost:3000"
    dataUrlBase="/api/grid/data/example"
    useURLState
/>
```

> [!IMPORTANT]  
> do to add `NuqsAdapter` to the root of your application

```tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <NuqsAdapter>{children}</NuqsAdapter>
            </body>
        </html>
    );
}
```
